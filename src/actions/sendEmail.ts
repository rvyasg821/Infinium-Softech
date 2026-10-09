"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  mobile: string;
  service: string;
  stage: string;
  startTime: string;
  message: string;
}) {
  try {
    const { name, email, mobile, service, stage, startTime, message } = formData;

    const data = await transporter.sendMail({
      from: `Infinium Softech <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || "hello@infiniumsoftech.com",
      subject: `New Contact Request from ${name}`,
      text: `
        New Contact Request
        
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
        Service: ${service}
        Stage: ${stage}
        Start Time: ${startTime}
        Message: ${message}
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return { success: false, error: "Failed to send email" };
  }
}

export async function sendDemoEmail(formData: {
  name: string;
  email: string;
  company: string;
  size: string;
  product: string;
  day: string;
  time: string;
  message: string;
}) {
  try {
    const { name, email, company, size, product, day, time, message } = formData;

    const data = await transporter.sendMail({
      from: `Infinium Softech <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || "hello@infiniumsoftech.com",
      subject: `New Demo Request: ${company || name}`,
      text: `
        New Demo Request
        
        Name: ${name}
        Email: ${email}
        Company: ${company || "Not provided"}
        Team Size: ${size}
        Product of Interest: ${product}
        Preferred Slot: ${day} at ${time}
        Additional Info: ${message}
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send demo email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
