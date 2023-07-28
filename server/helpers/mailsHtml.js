const welcomeMail = (name) => {
  return `
    <html>
    <head>
      <title>Welcome to Blood Donation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
        }
        
        h1 {
          color: #333;
        }
        
        p {
          color: #555;
          line-height: 1.5;
        }
        
        footer {
          margin-top: 40px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <h1>Welcome to Blood Donation</h1>
      <p>Dear ${name},</p>
      <p>Thank you for joining our platform. Your account (${name}) has been successfully created and sent to our admin for verification. Once your account is verified, you will be able to donate blood or request blood from other donors.</p>
      <p>Please check your email for further instructions and updates.</p>
      <p>For any inquiries, you can contact our support team.</p>
      
      <footer>
        <p>Contact us at: parulsahni3282@gmail.com</p>
        <p>Phone: 9999999999</p>
      </footer>
    </body>
    </html>
  `;
};

const createDonation = (name, email, bloodGroup) => {
  return `
    <html>
    <head>
      <title>Blood Donation Confirmation</title>
    </head>
    <body>
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="text-align: center;">Blood Donation Confirmation</h2>
        <p>Dear ${name},</p>
        <p>Thank you for your blood donation. Your contribution has been received and is awaiting verification by the admin.</p>
        <p>Donation Details:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Blood Group:</strong> ${bloodGroup}</li>
        </ul>
        <p>The admin will review your donation soon. We appreciate your support and will notify you once your donation is verified.</p>
        <p>Thank you for your generosity!</p>
        <p>Best regards,<br>The Blood Donation Team</p>
      </div>
    </body>
    </html>
    `;
};

const accountApprove = (name) => {
  return `
    <html>
    <head>
      <title>Account Approved</title>
      <style>
        body {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        h2 {
          text-align: center;
        }
        p {
          margin-bottom: 10px;
        }
        .container {
          background-color: #f2f2f2;
          border-radius: 5px;
          padding: 20px;
        }
        .signature {
          margin-top: 20px;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Account Approved</h2>
        <p>Dear ${name},</p>
        <p>We are delighted to inform you that your account has been approved by the admin.</p>
        <p>Your account is now active, and you can start using our services immediately.</p>
        <p>Thank you for joining our platform. We look forward to your active participation!</p>
        <p class="signature">Best regards,<br>The Admin Team</p>
      </div>
    </body>
    </html>
    
  `;
};

const accountReject = (name) => {
  return `<html>
    <head>
      <title>Account Rejection</title>
      <style>
        body {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        h2 {
          text-align: center;
        }
        p {
          margin-bottom: 10px;
        }
        .container {
          background-color: #f2f2f2;
          border-radius: 5px;
          padding: 20px;
        }
        .reason {
          font-weight: bold;
          color: #ff0000;
        }
        .signature {
          margin-top: 20px;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Account Rejection</h2>
        <p>Dear ${name},</p>
        <p>We regret to inform you that your account registration has been rejected by the admin.</p>
        <p>We appreciate your interest in joining our platform, but unfortunately, we are unable to proceed with your account at this time.</p>
        <p>If you have any further questions or need clarification, please feel free to contact our support team.</p>
        <p class="signature">Best regards,<br>The Admin Team</p>
      </div>
    </body>
    </html>
    `;
};

const donationApprove = (name, email, bloodGroup) => {
  return `
    <html>
    <head>
      <title>Blood Donation Approved</title>
    </head>
    <body>
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="text-align: center;">Blood Donation Approved</h2>
        <p>Dear ${name},</p>
  
        <p>We are pleased to inform you that your blood donation request has been approved by the admin.</p>
        <p>Donation Details:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Blood Group:</strong> ${bloodGroup}</li>
        </ul>
        <p>Your donation is greatly appreciated and will help save lives. Thank you for your generous contribution!</p>
        <p>Best regards,<br>The Blood Donation Team</p>
      </div>
    </body>
    </html>
    `;
};

const donationReject = () => {
  return `<html>
<head>
  <title>Blood Donation Rejection</title>
</head>
<body>
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
    <h2 style="text-align: center;">Blood Donation Rejection</h2>
    <p>Dear ${updatedUser.name},</p>
    <p>We regret to inform you that your blood donation request has been rejected by the admin.</p>
    <p>Donation Details:</p>
    <ul>
      <li><strong>Name:</strong> ${updatedUser.name}</li>
      <li><strong>Email:</strong> ${updatedUser.email}</li>
      <li><strong>Blood Group:</strong> ${updateDonation.bloodGroup}</li>
    </ul>
    <p>Unfortunately, we are unable to accept your donation at this time. We appreciate your willingness to contribute, but due to certain factors, it does not meet our requirements.</p>
    <p>We encourage you to continue supporting our cause and consider donating in the future when the circumstances are more suitable.</p>
    <p>Thank you for your understanding.</p>
    <p>Best regards,<br>The Blood Donation Team</p>
  </div>
</body>
</html>
`;
};

export default {
  welcomeMail,
  createDonation,
  accountApprove,
  accountReject,
  donationApprove,
  donationReject,
};
