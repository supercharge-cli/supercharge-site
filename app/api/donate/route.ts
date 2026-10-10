import { randomBytes } from 'node:crypto';
import { newTxnId, paymentHash, payuConfig } from '@/lib/payu';

export async function POST(request: Request) {
  const payu = payuConfig();
  if (!payu.ready) {
    return new Response('Donations are not configured.', { status: 503 });
  }

  const form = await request.formData();
  const amountNumber = Number(String(form.get('amount') ?? '').trim());
  const firstname = String(form.get('firstname') ?? '').trim().slice(0, 60);
  const email = String(form.get('email') ?? '').trim().slice(0, 80);
  if (!Number.isFinite(amountNumber) || amountNumber < 1 || amountNumber > 100000) {
    return new Response('Amount must be between ₹1 and ₹100000.', { status: 400 });
  }
  if (!firstname || !email.includes('@')) {
    return new Response('Name and email are required.', { status: 400 });
  }

  const amount = amountNumber.toFixed(2);
  const txnid = newTxnId();
  const productinfo = 'Supercharge donation';
  const hash = paymentHash({
    key: payu.key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    salt: payu.salt,
  });
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || new URL(request.url).origin;
  const callback = `${origin}/api/donate/callback`;
  const fields: Record<string, string> = {
    key: payu.key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    phone: phoneForPayu(String(form.get('phone') ?? '')),
    surl: callback,
    furl: callback,
    hash,
  };

  const inputs = Object.entries(fields)
    .filter(([, value]) => value)
    .map(([name, value]) => `<input type="hidden" name="${name}" value="${escapeHtml(value)}" />`)
    .join('');

  const html = `<!doctype html><html><body><p>Redirecting to PayU…</p><form id="payu" method="post" action="${payu.endpoint}">${inputs}</form><script>document.getElementById('payu').submit()</script></body></html>`;
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
}

function phoneForPayu(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 15);
  if (digits) return digits;
  const first = 6 + (randomBytes(1)[0] % 4);
  const rest = randomBytes(4).readUInt32BE(0) % 1_000_000_000;
  return `${first}${String(rest).padStart(9, '0')}`;
}

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
