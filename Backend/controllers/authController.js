const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
  try {
    console.log(req.body);
    
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: newpassword
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(201).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Generate a random 6-digit number
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Here you would send the resetToken via email
    await sendEmail(user.email, resetToken);
    // For testing, we'll return it in the response
    res.status(200).json({
      success: true,
      message: 'Password reset code sent',
      resetToken // In production, remove this and only send via email
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Add reset password endpoint
exports.resetPassword = async (req, res) => {
  try {
    const {email, otp, newPassword } = req.body;
console.log(req.body);
    const user = await User.findOne({
      resetPasswordToken: otp,
      email: email,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired reset token'
      });
    }


    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);
    console.log('====================================');
    console.log(password);
    console.log('====================================');
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};