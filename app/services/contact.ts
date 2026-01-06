import { Pool } from 'pg';
import nodemailer from 'nodemailer';

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

export interface ContactFormData {
  parent_name: string;
  email: string;
  student_name?: string;
  phone_number?: string;
  inquiry_type?: string;
  message: string;
}

// Save to Neon DB
export async function saveContact(formData: ContactFormData) {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO contacts (parent_name, email, student_name, phone_number, inquiry_type, message)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, created_at
    `;
    const values = [
      formData.parent_name,
      formData.email,
      formData.student_name || null,
      formData.phone_number || null,
      formData.inquiry_type || null,
      formData.message,
    ];

    const result = await client.query(query, values);
    return result.rows[0]; // returns inserted record ID + timestamp
  } finally {
    client.release();
  }
}

// Send email via SMTP
export async function sendContactEmail(formData: ContactFormData) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // true for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Emmanuel Senior School" <${process.env.SMTP_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `New Contact Form Submission: ${formData.inquiry_type || 'General Inquiry'}`,
    text: `
Parent/Guardian: ${formData.parent_name}
Email: ${formData.email}
Student Name: ${formData.student_name || 'N/A'}
Phone: ${formData.phone_number || 'N/A'}
Inquiry Type: ${formData.inquiry_type || 'N/A'}
Message:
${formData.message}
    `,
  };

  return transporter.sendMail(mailOptions);
}
