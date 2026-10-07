"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const data = await resend.emails.send({
      from: "Infinium Softech <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "hello@infiniumsoftech.com"], // Uses the email you specified in .env.local
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

    if (data.error) {
      console.error("Resend API returned an error:", data.error);
      return { success: false, error: data.error.message };
    }

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

    const data = await resend.emails.send({
      from: "Infinium Softech <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "hello@infiniumsoftech.com"], // Uses the email you specified in .env.local
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

    if (data.error) {
      console.error("Resend API returned an error:", data.error);
      return { success: false, error: data.error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send demo email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
