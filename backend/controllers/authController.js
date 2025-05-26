const nodemailer = require('nodemailer');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const OTPStore = {}; 

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "Email not found!" });

    const otp = Math.floor(1000 + Math.random() * 9000);
    OTPStore[email] = otp; 


    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Wonder Property" ${process.env.EMAIL_ID}`,
      to: email,
      subject: 'OTP for Password Reset',
      html: `<p>Your OTP is <b>${otp}</b></p>`,
    });

    res.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (OTPStore[email] && OTPStore[email] == otp) {
    res.json({ success: true, message: 'OTP verified' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
    
if (!email || !password || !confirmPassword) {
  return res.status(400).json({ message: 'All fields are required.' });
}

 if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }

  if (password.length < 8) {
  return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
}

const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User with this email does not exist.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

   await User.updateOne(
  { email },
  { $set: { password: hashedPassword } }
   );
    delete OTPStore[email];
    res.json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
