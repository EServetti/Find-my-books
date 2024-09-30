import { createTransport } from "nodemailer";

async function sendEmail(data) {
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
    const verificationUrl = `https://find-your-books.vercel.app/verify/${data.to}/${data.verifyCode}`
    const htmlContent = `
    <h1>Welcome to our store!</h1>
      <p>You just need to verify your account to start using our web site!</p>
      <a href="${verificationUrl}" style="padding: 10px 20px; background-color: blue; color: white; text-decoration: none; border-radius: 5px;">
        Do it here
      </a>
    `;
    await transport.sendMail({
      from: `Find your book <${process.env.GMAIL_USER}>`,
      to: data.to,
      subject: `Verification for ${data.name}`,
      html: htmlContent,
    });
  } catch (error) {
    throw error;
  }
}

export { sendEmail };
