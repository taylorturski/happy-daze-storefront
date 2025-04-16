import {NextResponse} from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return NextResponse.json({error: "Missing fields"}, {status: 400});
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Happy Daze Contact Form" <${process.env.SMTP_USER}>`,
      to: "hello@happydazegolf.com",
      subject: "New Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${(message as string).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({success: true});
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({error: "Failed to send email"}, {status: 500});
  }
}
