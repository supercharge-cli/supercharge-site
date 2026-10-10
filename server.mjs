import { createServer } from 'node:http';
import { parse } from 'node:url';
import next from 'next';
import { WebSocketServer } from 'ws';
import pty from 'node-pty';

const port = Number(process.env.PORT || 3000);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const shell = process.env.SUPERCHARGE_BIN || 'supercharge';
const cwd = process.env.SUPERCHARGE_TERMINAL_CWD || process.cwd();

let term = null;
const clients = new Set();
let scrollback = '';

function broadcast(data) {
  scrollback = (scrollback + data).slice(-400_000);
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
    scrollback = '';
  });
  return term;
}

await app.prepare();

const server = createServer((req, res) => {
  handle(req, res, parse(req.url, true));
});

const upgrade = app.getUpgradeHandler();
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (socket) => {
  clients.add(socket);
  const running = ensureTerm();
  if (scrollback) socket.send(JSON.stringify({ t: 'out', d: scrollback }));
  const cols = running.cols;
  const rows = running.rows;
  running.resize(Math.max(2, cols - 1), rows);
  setTimeout(() => {
    if (term === running) running.resize(cols, rows);
  }, 40);

  socket.on('message', (raw) => {
    let message;
    try {
      message = JSON.parse(raw.toString());
    } catch {
      return;
    }
    if (!term) return;
    if (message.t === 'in' && typeof message.d === 'string') term.write(message.d);
    if (message.t === 'resize' && message.cols > 2 && message.rows > 2) {
      term.resize(Math.min(message.cols, 240), Math.min(message.rows, 80));
    }
  });

  socket.on('close', () => clients.delete(socket));
});

server.on('upgrade', (req, socket, head) => {
  const { pathname } = parse(req.url || '', true);
  if (pathname === '/terminal') {
    wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req));
    return;
  }
  upgrade(req, socket, head);
});

server.listen(port, () => {
  console.log(`site http://localhost:${port}`);
  console.log(`supercharge PTY ws://localhost:${port}/terminal`);
});
