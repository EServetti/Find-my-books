import { createTransport } from "nodemailer";

async function recoverEmail(data) {
  try {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    await transport.verify();
    const resetUrl = `https://find-your-books.vercel.app/password/${data.token}`;
    const htmlContent = `
    <p>You requested a password reset. Please click on the following link to reset your password: </p>
    <a href="${resetUrl}" style="padding: 10px 20px; background-color: blue; color: white; text-decoration: none; border-radius: 5px;">
        Do it here
    </a>
    <p>If you didn't request this, please ignore this email.</p>`;
    await transport.sendMail({
      from: `Find your book <${process.env.GMAIL_USER}>`,
      to: data.to,
      subject: `Update password`,
      html: htmlContent,
    });
  } catch (error) {
    throw error;
  }
}

export { recoverEmail };
