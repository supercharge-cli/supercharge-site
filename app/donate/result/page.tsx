import Link from 'next/link';

export default async function DonateResult({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; txnid?: string; amount?: string }>;
}) {
  const params = await searchParams;
  const ok = params.status === 'success';
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-16 text-zinc-100">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-orange-600/20 blur-[120px]" />
      <div className="relative mx-auto max-w-md rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8">
        <h1 className="text-4xl font-semibold tracking-tight">{ok ? 'Thank you' : 'Payment not completed'}</h1>
        <p className="mt-4 text-zinc-400">
          {ok
            ? `PayU confirmed ₹${params.amount ?? ''} for ${params.txnid ?? 'this donation'}.`
            : 'PayU did not confirm this payment. You can try again.'}
        </p>
        <Link href="/donate" className="mt-8 inline-block rounded-full bg-orange-500 px-5 py-2.5 font-semibold text-black">
          Back to donate
        </Link>
      </div>
    </main>
  );
}
