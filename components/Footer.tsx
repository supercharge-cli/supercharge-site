import Link from 'next/link';
import { Github } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full border-t border-zinc-800 bg-zinc-950 py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

                    {/* Column 1: Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-lg font-bold text-white mb-3">Supercharge</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Free Rust coding agent. You pay the model provider you connect in /setup.
                        </p>
                    </div>

                    {/* Column 2: Documentation */}
                    <div>
                        <h4 className="text-sm font-semibold text-zinc-200 mb-3">Documentation</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/docs" className="text-zinc-400 hover:text-orange-400 transition-colors">Getting started</Link></li>
                            <li><Link href="/docs/install" className="text-zinc-400 hover:text-orange-400 transition-colors">Install</Link></li>
                            <li><Link href="/docs/modes" className="text-zinc-400 hover:text-orange-400 transition-colors">Run modes</Link></li>
                            <li><a href="https://github.com/iotserver24/supercharge" className="text-zinc-400 hover:text-orange-400 transition-colors">Source</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-500">
                        © {new Date().getFullYear()} R3AP3R Editz. CLI source is Apache-2.0 upstream. Site layout from VectraDocs.
                    </p>
                </div>
            </div>
        </footer>
    );
}
