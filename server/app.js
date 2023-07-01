import path from 'path';
import express from 'express';
import compression from 'compression';
import { createServer } from 'http';
import createGameSocket from './plugin.js';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 8080;
const app = express();
const server = createServer(app);
const __dirname = fileURLToPath(import.meta.url);

createGameSocket().configureServer({ httpServer: server });

app.use(compression());
app.use(express.static(path.join(__dirname, '../../dist')));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../../dist/index.html')));


server.listen(port);
