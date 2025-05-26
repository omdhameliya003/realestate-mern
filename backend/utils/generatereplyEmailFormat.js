 const generateEmailTemplate = (userMessage, adminReply) => {
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #333;
      text-align: center;
    }
    p {
      color: #555;
      line-height: 1.6;
    }
    .message-box {
      background: #f9f9f9;
      padding: 10px;
      border-left: 5px solid #007BFF;
      margin: 10px 0;
      font-style: italic;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888;
      margin-top: 20px;
    }
    .btn {
      display: inline-block;
      padding: 10px 15px;
      margin-top: 10px;
      background: #007BFF;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
    }
    .btn:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h2>Admin Response to Your Inquiry</h2>
    <p>Dear User,</p>
    <p>Thank you for reaching out to us. Below is your message and our response:</p>
    <div class="message-box">
      <strong>Your Message:</strong> <br>
      ${userMessage.replace(/\n/g, "<br>")}
    </div>
    <p><strong>Admin Response:</strong></p>
    <div class="message-box">
      ${adminReply.replace(/\n/g, "<br>")}
    </div>
    <p>If you have any further questions, feel free to contact us.</p>
    <p>Best Regards,<br><strong>Admin Team</strong><br><strong>Wonder Property</strong></p>
    <div class="footer">
      &copy; ${year} Your Company | All Rights Reserved
    </div>
  </div>
</body>
</html>
  `;
};
module.exports=generateEmailTemplate;
