import emailjs from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '2ox7-3gdQnHMcDfGD';
const PRIVATE_KEY = import.meta.env.VITE_EMAILJS_PRIVATE_KEY ?? '13AoFtuwDhq08EOOLqd3E';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_iv8bl6t';
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'default_service';

export interface EmailPayload {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  phone?: string;
  form_type?: string;
}

export async function sendEmail(payload: EmailPayload) {
  const templateParams = {
    from_name: payload.from_name,
    from_email: payload.from_email,
    reply_to: payload.from_email,
    user_name: payload.from_name,
    user_email: payload.from_email,
    subject: payload.subject,
    message: payload.message,
    phone: payload.phone ?? '',
    form_type: payload.form_type ?? 'contact',
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
    publicKey: PUBLIC_KEY,
    privateKey: PRIVATE_KEY,
  } as Parameters<typeof emailjs.send>[3]);
}

export async function sendVolunteerEmail(data: {
  name: string;
  email: string;
  phone: string;
  interest: string;
  availability: string;
  message: string;
}) {
  const body = [
    'Volunteer Application',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Area of Interest: ${data.interest}`,
    `Availability: ${data.availability}`,
    data.message ? `Message: ${data.message}` : '',
  ].filter(Boolean).join('\n');

  return sendEmail({
    from_name: data.name,
    from_email: data.email,
    subject: 'Volunteer Application — Shomajgori.org',
    message: body,
    phone: data.phone,
    form_type: 'volunteer',
  });
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const body = [
    'Website Contact Form',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    '',
    data.message,
  ].join('\n');

  return sendEmail({
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: body,
    form_type: 'contact',
  });
}
