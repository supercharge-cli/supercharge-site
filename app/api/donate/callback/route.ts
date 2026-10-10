import { NextResponse } from 'next/server';
import { payuConfig, responseHash } from '@/lib/payu';

export async function POST(request: Request) {
  const payu = payuConfig();
  const form = await request.formData();
  const status = String(form.get('status') ?? '');
  const txnid = String(form.get('txnid') ?? '');
  const amount = String(form.get('amount') ?? '');
  const extra = String(form.get('additionalCharges') ?? '');
  const expected = payu.ready
    ? responseHash({
        salt: payu.salt,
        status,
        email: String(form.get('email') ?? ''),
        firstname: String(form.get('firstname') ?? ''),
        productinfo: String(form.get('productinfo') ?? ''),
        amount,
        txnid,
        key: String(form.get('key') ?? ''),
        additionalCharges: extra || undefined,
      })
    : '';
  const posted = String(form.get('hash') ?? '');
  const verified = expected.length > 0 && posted === expected && status === 'success';
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || new URL(request.url).origin;
  const url = new URL('/donate/result', origin);
  url.searchParams.set('status', verified ? 'success' : 'failed');
  if (txnid) url.searchParams.set('txnid', txnid);
  if (amount) url.searchParams.set('amount', amount);
  return NextResponse.redirect(url, 303);
}
