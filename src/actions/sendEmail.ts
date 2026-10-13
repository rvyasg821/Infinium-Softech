"use server";

import nodemailer from "nodemailer";

const SITE_URL = "https://www.infiniumsoftech.com";

// Files inside Next.js public/ are served from the site root.
// public/brand/logo-light.png => https://infiniumsoftech.com/brand/logo-light.png
const LOGO_URL = "https://infiniumsoftech.com/brand/logo-light.png";

const PHONE = "+91 98765 43210";
const PHONE_RAW = "+919876543210";

// Colors taken from the Infinium logo (green -> teal -> cyan -> blue -> navy)
const BRAND = {
  navy: "#0C1A4B",
  header: "#111827", // header + footer background
  blue: "#1565C0",
  cyan: "#0EA5D9",
  green: "#8DC63F",
  page: "#F2F6FA",
  text: "#111827",
  muted: "#6B7789",
  border: "#E3E9F0",
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function escapeHtml(value: string): string {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

// Capitalizes the first letter of every word (the rest of each word is kept as typed)
function capitalizeName(value: string): string {
  return String(value ?? "")
    .trim()
    .replace(/(^|\s)(\S)/g, (_match, space: string, letter: string) => `${space}${letter.toUpperCase()}`);
}

function fieldRow(label: string, value?: string): string {
  const cleanValue = value?.trim() ?? "";
  const isEmpty = !cleanValue || cleanValue === "Not provided";
  const display = isEmpty ? "Not provided" : cleanValue;

  return `
    <tr>
      <td style="padding:0;">
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="border-bottom:1px solid ${BRAND.border};"
        >
          <tr>
            <td
              class="field-label"
              width="38%"
              valign="top"
              align="left"
              style="padding:14px 10px 14px 0;width:38%;vertical-align:top;text-align:left;"
            >
              <span style="
                font-size:10px;
                letter-spacing:1.5px;
                text-transform:uppercase;
                color:${BRAND.muted};
                font-weight:600;
                line-height:1.6;
              ">${escapeHtml(label)}</span>
            </td>
            <td
              class="field-value"
              valign="top"
              align="left"
              style="padding:14px 0 14px 8px;vertical-align:top;text-align:left;overflow-wrap:anywhere;word-break:break-word;"
            >
              <span style="
                font-size:14px;
                color:${isEmpty ? "#A0A6B2" : BRAND.text};
                font-weight:${isEmpty ? "400" : "500"};
                font-style:${isEmpty ? "italic" : "normal"};
                line-height:1.7;
                text-align:left;
                overflow-wrap:anywhere;
                word-break:break-word;
              ">${escapeHtml(display)}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function messageBox(
  heading: string,
  message: string,
  type: "contact" | "demo"
): string {
  const isContact = type === "contact";
  const background = isContact ? "#EAF3FD" : "#F1F9E6";
  const accent = isContact ? BRAND.blue : BRAND.green;
  const cleanMessage = message?.trim() ?? "";
  const content = cleanMessage
    ? escapeHtml(cleanMessage).replace(/\r\n|\r|\n/g, "<br />")
    : isContact
      ? "No message provided"
      : "No additional notes provided";

  return `
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="margin-top:22px;"
    >
      <tr>
        <td align="left" style="text-align:left;">
          <span style="
            display:block;
            font-size:10px;
            letter-spacing:1.5px;
            text-transform:uppercase;
            color:${BRAND.muted};
            font-weight:600;
            margin-bottom:10px;
            text-align:left;
          ">${escapeHtml(heading)}</span>
          <div style="
            background:${background};
            border-left:4px solid ${accent};
            border-radius:0 6px 6px 0;
            padding:15px 16px;
            font-size:14px;
            color:${cleanMessage ? BRAND.navy : "#A0A6B2"};
            line-height:1.8;
            font-style:${cleanMessage ? "normal" : "italic"};
            text-align:left;
            overflow-wrap:anywhere;
            word-break:break-word;
          ">${content}</div>
        </td>
      </tr>
    </table>
  `;
}

function buildEmail(
  tagline: string,
  fieldsHtml: string,
  messageHtml: string,
  requestType: "contact" | "demo"
): string {
  const isContact = requestType === "contact";

  const pageTitle = isContact ? "Contact Details" : "Project Demo Request";

  // Highlighted intro line (left aligned, top of the body)
  const highlightBg = isContact ? "#EAF3FD" : "#F1F9E6";
  const highlightAccent = isContact ? BRAND.blue : BRAND.green;

  // Footer notification line
  const footerNotice = isContact
    ? "This is a notification that a contact form was submitted on your website."
    : "This is a notification that a project demo request form was submitted on your website.";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light" />
  <title>Infinium Softech - ${escapeHtml(pageTitle)}</title>
  <style>
    :root {
      color-scheme: light only;
      supported-color-schemes: light;
    }

    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      background-color: ${BRAND.page};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      display: block;
      border: 0;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    .email-wrapper {
      width: 100%;
      background-color: ${BRAND.page};
      padding: 36px 16px;
    }

    .email-card {
      width: 100%;
      max-width: 600px;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 3px 18px rgba(12, 26, 75, 0.10);
    }

    @media only screen and (max-width: 600px) {
      .email-wrapper {
        padding: 12px 6px !important;
      }

      .email-card {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 8px !important;
      }

      .header-td {
        padding: 20px 14px !important;
      }

      .logo-image {
        width: 140px !important;
        max-width: 100% !important;
        height: auto !important;
      }

      .body-td {
        padding: 24px 16px 20px !important;
      }

      .field-label {
        width: 35% !important;
      }

      .field-value {
        padding-left: 8px !important;
        overflow-wrap: anywhere !important;
        word-break: break-word !important;
      }

      .footer-td {
        padding: 20px 16px 22px !important;
      }

      .footer-link-item a {
        font-size: 11px !important;
      }

      .footer-link-sep {
        padding: 0 6px !important;
      }
    }

    @media only screen and (max-width: 360px) {
      .logo-image {
        width: 118px !important;
      }

      .header-td {
        padding: 18px 10px !important;
      }

      .body-td {
        padding: 20px 12px 18px !important;
      }
    }
  </style>
</head>

<body style="margin:0;padding:0;background-color:${BRAND.page};font-family:Arial,Helvetica,sans-serif;">
  <table
    class="email-wrapper"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    role="presentation"
    style="width:100%;background-color:${BRAND.page};padding:36px 16px;"
  >
    <tr>
      <td align="center">
        <table
          class="email-card"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          role="presentation"
          style="width:100%;max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 3px 18px rgba(12,26,75,0.10);"
        >
          <!-- HEADER -->
          <tr>
            <td class="header-td" align="center" bgcolor="${BRAND.header}" style="background-color:${BRAND.header};background-image:linear-gradient(${BRAND.header},${BRAND.header});padding:26px 28px;text-align:center;">
              <a href="${SITE_URL}" target="_blank" style="display:inline-block;text-decoration:none;">
                <img
                  class="logo-image"
                  src="${LOGO_URL}"
                  alt="Infinium Softech"
                  width="170"
                  style="display:block;width:170px;max-width:100%;height:auto;border:0;margin:0 auto;"
                />
              </a>
            </td>
          </tr>

          <!-- BRAND ACCENT: GREEN -> CYAN -> BLUE (same flow as the logo) -->
          <tr>
            <td
              height="4"
              bgcolor="${BRAND.cyan}"
              style="height:4px;background-color:${BRAND.cyan};background-image:linear-gradient(90deg,${BRAND.green} 0%,${BRAND.cyan} 55%,${BRAND.blue} 100%);line-height:4px;font-size:0;"
            >&nbsp;</td>
          </tr>

          <!-- BODY -->
          <tr>
            <td class="body-td" style="padding:30px 32px 24px;">

              <!-- HIGHLIGHTED INTRO LINE (left aligned) -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin-bottom:22px;">
                <tr>
                  <td align="left" style="text-align:left;">
                    <div style="background:${highlightBg};border-left:4px solid ${highlightAccent};border-radius:0 6px 6px 0;padding:14px 16px;font-size:14px;font-weight:600;color:${BRAND.navy};line-height:1.7;text-align:left;overflow-wrap:anywhere;word-break:break-word;">${escapeHtml(tagline)}</div>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
                <tr>
                  <td height="1" bgcolor="${BRAND.border}" style="height:1px;font-size:0;line-height:1px;">&nbsp;</td>
                </tr>
              </table>

              <!-- DETAILS TABLE (left aligned) -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
                ${fieldsHtml}
              </table>

              ${messageHtml}
            </td>
          </tr>

          <!-- FOOTER (same background as header) -->
          <tr>
            <td class="footer-td" align="center" bgcolor="${BRAND.header}" style="background-color:${BRAND.header};background-image:linear-gradient(${BRAND.header},${BRAND.header});padding:24px 32px 26px;text-align:center;">
              <span style="display:block;margin:0 0 12px 0;font-size:12px;color:#C5CCD8;line-height:1.7;text-align:center;">
                ${escapeHtml(footerNotice)}
              </span>

              <table align="center" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin:0 auto 12px auto;text-align:center;">
                <tr>
                  <td class="footer-link-item" align="center" style="padding:0;vertical-align:middle;text-align:center;">
                    <a href="${SITE_URL}" target="_blank" style="color:${BRAND.cyan};font-size:12px;font-weight:700;text-decoration:underline;">
                      www.infiniumsoftech.com
                    </a>
                  </td>
                  <td class="footer-link-sep" style="padding:0 10px;color:#4B5563;font-size:14px;vertical-align:middle;">|</td>
                  <td class="footer-link-item" align="center" style="padding:0;vertical-align:middle;text-align:center;">
                    <a href="tel:${PHONE_RAW}" style="color:${BRAND.cyan};font-size:12px;font-weight:700;text-decoration:underline;">
                      ${escapeHtml(PHONE)}
                    </a>
                  </td>
                </tr>
              </table>

              <span style="display:block;margin:0;font-size:9px;color:#7B8494;line-height:1.6;text-align:center;">
                &copy; ${new Date().getFullYear()} Infinium Softech. All rights reserved.
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function deliverEmail(options: {
  subject: string;
  text: string;
  html: string;
}) {
  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("SMTP configuration is incomplete.");
      return {
        success: false,
        error: "Email service is not configured.",
      };
    }

    await transporter.sendMail({
      from: `Infinium Softech <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || "hello@infiniumsoftech.com",
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: "Failed to send email. Please try again later.",
    };
  }
}

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

    if (!name?.trim() || !email?.trim()) {
      return { success: false, error: "Name and email are required." };
    }

    const displayName = capitalizeName(name);

    const fieldsHtml = [
      fieldRow("Name", displayName),
      fieldRow("Email Address", email),
      fieldRow("Mobile Number", mobile),
      fieldRow("Service", service),
      fieldRow("App Stage", stage),
      fieldRow("When to Start", startTime),
    ].join("");

    const html = buildEmail(
      "A new contact form has been submitted on the Infinium Softech website.",
      fieldsHtml,
      messageBox("Message", message || "", "contact"),
      "contact"
    );

    const text = [
      "CONTACT DETAILS",
      "",
      `Name: ${displayName}`,
      `Email: ${email}`,
      `Mobile: ${mobile || "Not provided"}`,
      `Service: ${service || "Not provided"}`,
      `App Stage: ${stage || "Not provided"}`,
      `When to Start: ${startTime || "Not provided"}`,
      "",
      "Message:",
      message || "No message provided",
      "",
      "---",
      "This is a notification that a contact form was submitted on your website.",
      `${SITE_URL} | ${PHONE}`,
    ].join("\n");

    return await deliverEmail({
      subject: `${displayName} - Contact Details`,
      text,
      html,
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return { success: false, error: "Failed to send email." };
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

    if (!name?.trim() || !email?.trim()) {
      return { success: false, error: "Name and work email are required." };
    }

    const displayName = capitalizeName(name);

    const fieldsHtml = [
      fieldRow("Name", displayName),
      fieldRow("Work Email", email),
      fieldRow("Company", company),
      fieldRow("Team Size", size),
      fieldRow("Product", product),
      fieldRow("Preferred Day", day),
      fieldRow("Preferred Time", time),
    ].join("");

    const tagline = company?.trim()
      ? `A project demo has been requested for ${company.trim()}.`
      : "A new project demo has been requested on the Infinium Softech website.";

    const html = buildEmail(
      tagline,
      fieldsHtml,
      messageBox("Additional Notes", message || "", "demo"),
      "demo"
    );

    const text = [
      "PROJECT DEMO REQUEST",
      "",
      `Name: ${displayName}`,
      `Work Email: ${email}`,
      `Company: ${company || "Not provided"}`,
      `Team Size: ${size || "Not provided"}`,
      `Product: ${product || "Not provided"}`,
      `Preferred Day: ${day || "Not provided"}`,
      `Preferred Time: ${time || "Not provided"}`,
      "",
      "Additional Notes:",
      message || "No additional notes provided",
      "",
      "---",
      "This is a notification that a project demo request form was submitted on your website.",
      `${SITE_URL} | ${PHONE}`,
    ].join("\n");

    return await deliverEmail({
      subject: `${displayName} - Project Demo Request`,
      text,
      html,
    });
  } catch (error) {
    console.error("Failed to send demo email:", error);
    return { success: false, error: "Failed to send email." };
  }
}