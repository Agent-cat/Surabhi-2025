import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const otpStore = new Map();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};



export const register = async (req, res) => {
  try {
    const {
      email,
      password,
      college,
      collegeId,
      fullName,
      paymentId,
      paymentScreenshot,
      state,
      address,
      phoneNumber,
    } = req.body;

    const existingUser = await User.findOne({
      $or: [
        { email },
        { phoneNumber }
      ]
    });
    if (existingUser) {
      return res.status(400).json({
        error: existingUser.email === email ?
          "User already exists with this email" :
          "Phone number already registered"
      });
    }

    if (college === "kluniversity") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        email,
        password: hashedPassword,
        college,
        collegeId,
        fullName,
        state,
        address,
        phoneNumber,
        paymentStatus: "approved",
        isApproved: true,
      });

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      return res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        college: newUser.college,
        collegeId: newUser.collegeId,
        fullName: newUser.fullName,
        state: newUser.state,
        address: newUser.address,
        paymentStatus: newUser.paymentStatus,
        role: newUser.role,
        token,
      });
    }

    const tempPassword = "pending_" + Math.random().toString(36).slice(2);
    const salt = await bcrypt.genSalt(10);
    const hashedTempPassword = await bcrypt.hash(tempPassword, salt);

    const pendingRegistration = await User.create({
      email,
      password: hashedTempPassword,
      college,
      collegeId,
      fullName,
      state,
      address,
      phoneNumber,
      paymentId,
      paymentScreenshot,
      paymentStatus: "pending",
      isApproved: false,
      registrationData: {
        originalPassword: password,
        college: college,
        collegeId: collegeId,
        fullName: fullName,
      },
    });

    res.status(201).json({
      message: "Registration pending admin approval",
      email: pendingRegistration.email,
      paymentStatus: "pending",
      role: pendingRegistration.role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!user.isApproved) {
      if (user.paymentStatus === "rejected") {
        return res.status(403).json({
          error: "Your registration has been rejected. Please contact support.",
          status: "rejected",
        });
      }
      if (user.paymentStatus === "pending") {
        return res.status(403).json({
          error: "Your registration is pending approval. Please wait for admin confirmation.",
          status: "pending",
        });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      _id: user._id,
      email: user.email,
      college: user.college,
      collegeId: user.collegeId,
      fullName: user.fullName,
      state: user.state,
      address: user.address,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email }).select('-password');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      college: user.college,
      collegeId: user.collegeId,
      state: user.state,
      address: user.address,
      paymentStatus: user.paymentStatus,
      isApproved: user.isApproved,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendVerificationOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const otp = generateOTP();
    const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // Store OTP with expiry
    otpStore.set(email, {
      otp,
      expiry: expiryTime
    });

    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp);
    if (!emailSent) {
      throw new Error('Failed to send verification email');
    }

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
