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
    const htmlContent = `
    <h1>Welcome to our store!</h1>
      <p>You just need to verify your account to start using our web site!</p>
      <p>Do it using the following code ${data.verifyCode}
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
