const nodemailer = require('nodemailer');

const sendMatchEmail = async (ownerEmail, founderEmail, itemName) => {
  try {
    console.log(`Attempting to send email with password length: ${process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0}`);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ownerEmail,
      subject: `Match found for your lost item: ${itemName}`,
      text: `Hello,\n\nA match was found for your lost item: ${itemName}.\n\nPlease contact the founder at: ${founderEmail}\n\nBest regards,\nLost and Found System`,
      replyTo: founderEmail // Allows owner to reply directly to founder
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = { sendMatchEmail };
