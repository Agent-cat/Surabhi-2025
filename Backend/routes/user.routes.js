import express from "express";
import { register, login, allUsers, verifyUser, sendVerificationOTP, verifyOTP, sendPasswordResetOTP, resetPassword } from "../controllers/user.controller.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Add upload endpoint
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

router.post("/register", register);
router.post("/login", login);
router.get("/all-users", allUsers);
router.get("/verify-user", verifyUser);
router.post("/send-verification-otp", sendVerificationOTP);
router.post("/verify-otp", verifyOTP);
router.post("/send-reset-otp", sendPasswordResetOTP);
router.post("/reset-password", resetPassword);

export default router;
