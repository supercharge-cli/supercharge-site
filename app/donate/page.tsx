import type { Metadata } from 'next';
import Link from 'next/link';
import { payuConfig } from '@/lib/payu';
import { DonateForm } from './donate-form';

export const metadata: Metadata = {
  title: 'Donate — Supercharge',
  description: 'Support Supercharge with a one-time donation through PayU.',
};

export default function DonatePage() {
  const ready = payuConfig().ready;

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-16 text-zinc-100">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-orange-600/20 blur-[120px]" />
      <div className="relative mx-auto max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <img src="/logo.png" alt="" width={28} height={28} className="h-7 w-7 rounded-md object-cover" />
          Supercharge
        </Link>
        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400">Support the project</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Donate</h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            One-time payment in INR. Supercharge stays free. This does not buy a plan or credits.
          </p>
          {ready ? (
            <DonateForm />
          ) : (
            <p className="mt-8 text-zinc-400">Donations are not turned on yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
