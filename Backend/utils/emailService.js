import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false // Accept self-signed certificates
  }
});

export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"SURABHI Registration" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'SURABHI Registration - Email Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6d28d9;">Email Verification</h2>
        <p>Your OTP for SURABHI registration is:</p>
        <h1 style="color: #4c1d95; font-size: 32px; letter-spacing: 5px; margin: 20px 0;">${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't request this verification, please ignore this email.</p>
      </div>
    `
  };

  try {
   
    await transporter.verify();
    
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    // Add more detailed error logging
    if (error.code === 'EAUTH') {
      console.error('Authentication failed. Check credentials.');
    } else if (error.code === 'ESOCKET') {
      console.error('Connection failed. Check network and firewall settings.');
    }
    return false;
  }
}; 