'use client';

import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

export function LiveTerminal() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = hostRef.current;
    if (!mount) return;

    const term = new Terminal({
      cursorBlink: true,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSize: 13,
      theme: {
        background: '#09090b',
        foreground: '#e4e4e7',
        cursor: '#fb923c',
      },
    });
    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(mount);
    requestAnimationFrame(() => fit.fit());

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(`${protocol}//${window.location.host}/terminal`);
    socket.onopen = () => {
      socket.send(JSON.stringify({ t: 'resize', cols: term.cols, rows: term.rows }));
    };
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data as string) as { t: string; d?: string };
      if (message.t === 'out' && message.d) term.write(message.d);
    };
    const input = term.onData((data) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ t: 'in', d: data }));
      }
    });

    const onResize = () => {
      fit.fit();
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ t: 'resize', cols: term.cols, rows: term.rows }));
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      input.dispose();
      socket.close();
      term.dispose();
    };
  }, []);

  return (
    <div className="relative z-10 mt-14 w-full max-w-5xl text-left">
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
          <span className="font-mono text-xs text-zinc-400">supercharge</span>
          <span className="font-mono text-[11px] text-zinc-500">live process</span>
        </div>
        <div ref={hostRef} className="h-[420px] px-2 py-2" />
      </div>
    </div>
  );
}
