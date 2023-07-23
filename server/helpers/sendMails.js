import nodemailer from "nodemailer";

const sendMail =  (to, subject, html) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "parulsahni3282@gmail.com",
      pass: "kqdblultytwnhllq",
    },
  });
  let mailOptions = {
    from: "parulsahni3282@gmail.com",
    to,
    subject,
    html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Erroe Occured " + error);
    } else {
      console.log("Email Sent Successfully to " + mailOptions.to);
    }
  });
};

export default sendMail;
