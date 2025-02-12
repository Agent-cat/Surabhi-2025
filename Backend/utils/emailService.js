import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const sendOTPEmail = async (email, otp) => {
    try {
        console.log('Attempting to send email to:', email);
        console.log('Using credentials:', {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD + '...' // Log only first 3 chars for security
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification - Surabhi Festival',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6b46c1;">Verify Your Email</h2>
          <p>Thank you for registering for Surabhi Festival. Your OTP for email verification is:</p>
          <h1 style="color: #6b46c1; font-size: 32px; letter-spacing: 5px; margin: 20px 0;">${otp}</h1>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
        </div>
      `
        };

        console.log('Sending mail with options:', { ...mailOptions, html: '[HIDDEN]' });

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error in sendOTPEmail:', error);
        if (error.code === 'EAUTH') {
            console.error('Authentication error - check email credentials');
        }
        return false;
    }
}; 