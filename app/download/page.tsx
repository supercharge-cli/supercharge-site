import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDownToLine, ArrowRight, Smartphone, Monitor, ShieldCheck, Server } from 'lucide-react';
import {
  androidUniversal,
  desktopDownloads,
  serverDownloads,
  studioLatestDownload,
  studioRelease,
  studioReleasePage,
} from '@/lib/studio-downloads';

export const metadata: Metadata = {
  title: 'Download Supercharge Studio',
  description: 'Studio is an app that runs on the CLI, so the CLI has to be installed for it to run. The mobile app connects to the PC app.',
};

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-black px-5 py-16 text-zinc-100 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-zinc-400 transition hover:text-white">← Supercharge home</Link>
        <header className="mt-12 max-w-3xl">
          <p className="font-mono text-sm text-orange-400">SUPERCHARGE STUDIO · {studioRelease}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Your coding agent, at your desk and in your pocket.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Studio is an app that runs on the CLI, so the CLI has to be installed for it to run. The mobile app connects to the PC app.
          </p>
        </header>

        <section className="mt-12 border-t border-zinc-800 pt-8" aria-labelledby="desktop-downloads">
          <div className="flex items-center gap-3">
            <Monitor className="h-5 w-5 text-orange-400" />
            <h2 id="desktop-downloads" className="text-2xl font-semibold">Desktop downloads</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {desktopDownloads.map((download) => (
              <a key={download.file} href={`${studioLatestDownload}/${download.file}`} className="group flex min-h-24 items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-4 transition hover:border-orange-500/60 hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400">
                <span>
                  <span className="block font-medium text-zinc-100">{download.name}</span>
                  <span className="mt-1 block text-sm text-zinc-500">{download.note}</span>
                </span>
                <ArrowDownToLine className="h-5 w-5 shrink-0 text-orange-400 transition group-hover:translate-y-0.5" />
              </a>
            ))}
          </div>
          <a href={studioReleasePage} className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-white">
            All release files and checksums <ArrowRight className="h-4 w-4" />
          </a>
        </section>

        <section className="mt-14 border-t border-zinc-800 pt-8" aria-labelledby="server-downloads">
          <div className="flex items-center gap-3">
            <Server className="h-5 w-5 text-orange-400" />
            <h2 id="server-downloads" className="text-2xl font-semibold">Server</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serverDownloads.map((download) => (
              <a key={download.file} href={`${studioLatestDownload}/${download.file}`} className="group flex min-h-24 items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-4 transition hover:border-orange-500/60 hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400">
                <span>
                  <span className="block font-medium text-zinc-100">{download.name}</span>
                  <span className="mt-1 block text-sm text-zinc-500">{download.note}</span>
                </span>
                <ArrowDownToLine className="h-5 w-5 shrink-0 text-orange-400 transition group-hover:translate-y-0.5" />
              </a>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-10 border-t border-zinc-800 pt-8 md:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-orange-400" />
              <h2 className="text-2xl font-semibold">Android phone</h2>
            </div>
            <p className="mt-4 leading-7 text-zinc-400">The mobile app connects to the PC app. Download the universal Android build.</p>
            <a href={`${studioLatestDownload}/${androidUniversal.file}`} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-semibold text-black transition hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300">
              <ArrowDownToLine className="h-5 w-5" /> Universal Android APK
            </a>
            <p className="mt-3 text-sm leading-6 text-amber-200/80">This release APK is unsigned. Android requires a signed APK to install, so this file is for signing/development—not a one-tap install.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Connect your phone to your computer</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-zinc-400 marker:text-orange-400">
              <li>Install the <Link href="/docs/install" className="text-zinc-200 underline underline-offset-4 hover:text-orange-300">Supercharge AI CLI</Link> on your computer and run <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-sm text-orange-200">/setup</code> once to configure your model provider.</li>
              <li>Open Studio on the computer. It can start the CLI agent in the background or attach to one already running; no separate terminal is needed.</li>
              <li>In Studio, open <strong className="text-zinc-200">Settings → Devices</strong> and choose <strong className="text-zinc-200">Show pairing code</strong>.</li>
              <li>Scan the code with Studio Mobile, then approve the pairing on the computer. The built-in encrypted relay also supports connecting away from your local Wi-Fi.</li>
            </ol>
            <p className="mt-4 flex gap-2 text-sm leading-6 text-zinc-500"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />Your phone connects to the desktop gateway; the desktop runs the Supercharge CLI agent.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
