import nodemailer from 'nodemailer'

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_SERVER_FROM,
    to: to,
    subject: subject,
    text: text,
    html: html,
  }

  return transporter.sendMail(mailOptions)
}

export default sendEmail
