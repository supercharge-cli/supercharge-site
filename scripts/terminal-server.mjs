import { WebSocketServer } from 'ws';
import pty from 'node-pty';

const host = '127.0.0.1';
const port = Number(process.env.SUPERCHARGE_TERMINAL_PORT || 3457);
const shell = process.env.SUPERCHARGE_BIN || 'supercharge';
const cwd = process.env.SUPERCHARGE_TERMINAL_CWD || process.cwd();

let term = null;
const clients = new Set();
let scrollback = '';

function broadcast(data) {
  scrollback = (scrollback + data).slice(-200_000);
  const payload = JSON.stringify({ t: 'out', d: data });
  for (const client of clients) {
    if (client.readyState === 1) client.send(payload);
  }
}

function ensureTerm() {
  if (term) return term;
  term = pty.spawn(shell, [], {
    name: 'xterm-256color',
    cols: 110,
    rows: 32,
    cwd,
    env: process.env,
  });
  term.onData(broadcast);
  term.onExit(() => {
    broadcast('\r\n[supercharge exited]\r\n');
    term = null;
  });
  return term;
}

const wss = new WebSocketServer({ host, port });

wss.on('connection', (socket, request) => {
  const address = request.socket.remoteAddress || '';
  const local = address === '127.0.0.1' || address === '::1' || address.endsWith('127.0.0.1');
  if (!local) {
    socket.close(1008, 'localhost only');
    return;
  }

  clients.add(socket);
  const running = ensureTerm();
  if (scrollback) socket.send(JSON.stringify({ t: 'out', d: scrollback }));

  socket.on('message', (raw) => {
    let message;
    try {
      message = JSON.parse(raw.toString());
    } catch {
      return;
    }
    if (!running || !term) return;
    if (message.t === 'in' && typeof message.d === 'string') term.write(message.d);
    if (message.t === 'resize' && message.cols > 0 && message.rows > 0) {
      term.resize(Math.min(message.cols, 240), Math.min(message.rows, 80));
    }
  });

  socket.on('close', () => clients.delete(socket));
});

wss.on('listening', () => {
  console.log(`supercharge PTY on ws://${host}:${port}`);
});
