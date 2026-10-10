'use client';

import { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

const PORT = 3457;

export function LiveTerminal() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState('Connecting to the local supercharge process…');

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
    fit.fit();

    const socket = new WebSocket(`ws://127.0.0.1:${PORT}`);
    socket.onopen = () => {
      setStatus('supercharge is running on this machine. Keys go to that process.');
      socket.send(JSON.stringify({ t: 'resize', cols: term.cols, rows: term.rows }));
    };
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data as string) as { t: string; d?: string };
      if (message.t === 'out' && message.d) term.write(message.d);
    };
    socket.onerror = () => {
      setStatus('The PTY server is not up. From supercharge-site run: npm run terminal');
    };
    socket.onclose = () => {
      setStatus((current) =>
        current.startsWith('supercharge') ? 'The supercharge process disconnected.' : current,
      );
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
          <span className="font-mono text-[11px] text-zinc-600">127.0.0.1:{PORT}</span>
        </div>
        <div ref={hostRef} className="h-[420px] px-2 py-2" />
        <p className="border-t border-zinc-800 px-4 py-2 text-xs text-zinc-500">{status}</p>
      </div>
    </div>
  );
}
