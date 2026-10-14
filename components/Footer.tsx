import Link from 'next/link';
import { Github } from 'lucide-react';

const columns = [
  {
    title: 'Start',
    links: [
      { href: '/docs', label: 'Getting started' },
      { href: '/docs/install', label: 'Install CLI' },
      { href: '/download', label: 'Download Studio' },
      { href: '/docs/setup', label: 'Provider setup' },
      { href: '/docs/commands', label: 'CLI commands' },
      { href: '/donate', label: 'Donate' },
    ],
  },
  {
    title: 'Reference',
    links: [
      { href: '/docs/slash', label: 'Slash commands' },
      { href: '/docs/keys', label: 'Keys' },
      { href: '/docs/sessions', label: 'Sessions' },
      { href: '/docs/permissions', label: 'Permissions' },
      { href: '/docs/config', label: 'Config' },
      { href: '/docs/memory', label: 'Memory' },
    ],
  },
  {
    title: 'Run it',
    links: [
      { href: '/docs/modes', label: 'ACP and daemon' },
      { href: '/docs/extensions', label: 'MCP, skills, hooks' },
      { href: 'https://github.com/iotserver24/supercharge-app', label: 'App' },
      { href: 'https://github.com/iotserver24/supercharge-releases', label: 'Releases' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="grid w-full gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <p className="flex items-center gap-2 text-base font-semibold text-white">
            <img src="/logo.png" alt="" width={28} height={28} className="h-7 w-7 rounded-md object-cover" />
            Supercharge
          </p>
          <p className="mt-3 max-w-xs text-sm leading-6">
            A free Rust coding agent. Connect the model provider you already pay in{' '}
            <span className="font-mono text-zinc-200">/setup</span>. The desktop app is closed source and free to use.
          </p>
          <a
            href="https://github.com/iotserver24/supercharge-app"
            className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-orange-400"
          >
            <Github className="h-4 w-4" />
            iotserver24/supercharge-app
          </a>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold text-zinc-100">{column.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('http') ? (
                    <a href={link.href} className="hover:text-orange-400">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="hover:text-orange-400">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-800">
        <div className="flex w-full flex-col gap-2 px-6 py-4 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} R3AP3R Editz</p>
          <p>superchargeai.in</p>
        </div>
      </div>
    </footer>
  );
}
