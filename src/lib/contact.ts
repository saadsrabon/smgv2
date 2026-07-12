export const CONTACT_EMAIL = 'shomajgorifoundationvcc@gmail.com';

export function sendMailto({
  subject,
  body,
}: {
  subject: string;
  body: string;
}) {
  const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
}
