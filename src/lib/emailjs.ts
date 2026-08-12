import emailjs from '@emailjs/browser';

type EmailJsConfig = {
  publicKey: string;
  serviceId: string;
  templateId: string;
};

/** Contact form — separate EmailJS account (browser uses public key + allowed origins). */
const contactConfig: EmailJsConfig = {
  publicKey: import.meta.env.VITE_EMAILJS_CONTACT_PUBLIC_KEY ?? '',
  serviceId: import.meta.env.VITE_EMAILJS_CONTACT_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID ?? '',
};

/** Volunteer form — separate EmailJS account */
const volunteerConfig: EmailJsConfig = {
  publicKey: import.meta.env.VITE_EMAILJS_VOLUNTEER_PUBLIC_KEY ?? '2ox7-3gdQnHMcDfGD',
  serviceId: import.meta.env.VITE_EMAILJS_VOLUNTEER_SERVICE_ID ?? 'default_service',
  templateId: import.meta.env.VITE_EMAILJS_VOLUNTEER_TEMPLATE_ID ?? 'template_iv8bl6t',
};

export interface EmailPayload {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  phone?: string;
  form_type?: string;
}

function assertConfig(config: EmailJsConfig, formLabel: string) {
  const missing = (
    [
      ['public key', config.publicKey],
      ['service ID', config.serviceId],
      ['template ID', config.templateId],
    ] as const
  )
    .filter(([, value]) => !value)
    .map(([label]) => label);

  if (missing.length) {
    throw new Error(
      `EmailJS ${formLabel} is not configured (${missing.join(', ')}). ` +
        'Add VITE_EMAILJS_* variables and rebuild the site.',
    );
  }
}

export function getEmailJsErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (error && typeof error === 'object' && 'text' in error) {
    return String((error as { text: string }).text);
  }
  return 'Unknown error';
}

async function sendWithConfig(config: EmailJsConfig, formLabel: string, payload: EmailPayload) {
  assertConfig(config, formLabel);
  emailjs.init({ publicKey: config.publicKey });

  const templateParams = {
    from_name: payload.from_name,
    from_email: payload.from_email,
    reply_to: payload.from_email,
    user_name: payload.from_name,
    user_email: payload.from_email,
    subject: payload.subject,
    message: payload.message,
    phone: payload.phone ?? '',
    form_type: payload.form_type ?? formLabel,
  };

  return emailjs.send(config.serviceId, config.templateId, templateParams, {
    publicKey: config.publicKey,
  });
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

  return sendWithConfig(volunteerConfig, 'volunteer', {
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
  return sendWithConfig(contactConfig, 'contact', {
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: data.message,
    form_type: 'contact',
  });
}
