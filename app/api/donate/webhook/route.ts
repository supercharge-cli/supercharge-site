import { payuConfig, responseHash } from '@/lib/payu';

// PayU server-to-server webhook. Same posted fields as the browser callback.
// Set this in the PayU dashboard after the site is hosted:
// https://superchargeai.in/api/donate/webhook
export async function POST(request: Request) {
  const payu = payuConfig();
  if (!payu.ready) return new Response('not configured', { status: 503 });

  const form = await request.formData();
  const extra = String(form.get('additionalCharges') ?? '');
  const expected = responseHash({
    salt: payu.salt,
    status: String(form.get('status') ?? ''),
    email: String(form.get('email') ?? ''),
    firstname: String(form.get('firstname') ?? ''),
    productinfo: String(form.get('productinfo') ?? ''),
    amount: String(form.get('amount') ?? ''),
    txnid: String(form.get('txnid') ?? ''),
    key: String(form.get('key') ?? ''),
    additionalCharges: extra || undefined,
  });
  const posted = String(form.get('hash') ?? '');
  if (!posted || posted !== expected) return new Response('invalid', { status: 401 });
  return new Response('ok');
}
