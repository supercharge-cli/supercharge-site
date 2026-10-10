import { createHash, randomBytes } from 'node:crypto';

export function payuConfig() {
  const key = process.env.PAYU_KEY?.trim() ?? '';
  const salt = process.env.PAYU_SALT?.trim() ?? '';
  const mode = process.env.PAYU_MODE === 'live' ? 'live' : 'test';
  return {
    key,
    salt,
    mode,
    endpoint: mode === 'live' ? 'https://secure.payu.in/_payment' : 'https://test.payu.in/_payment',
    ready: Boolean(key && salt),
  };
}

export function sha512(value: string) {
  return createHash('sha512').update(value).digest('hex');
}

export function paymentHash(input: {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  salt: string;
}) {
  const { key, txnid, amount, productinfo, firstname, email, salt } = input;
  return sha512(`${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`);
}

export function responseHash(input: {
  salt: string;
  status: string;
  email: string;
  firstname: string;
  productinfo: string;
  amount: string;
  txnid: string;
  key: string;
  additionalCharges?: string;
}) {
  const { salt, status, email, firstname, productinfo, amount, txnid, key, additionalCharges } = input;
  const core = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
  return sha512(additionalCharges ? `${additionalCharges}|${core}` : core);
}

export function newTxnId() {
  return `donate${Date.now().toString(36)}${randomBytes(4).toString('hex')}`;
}
