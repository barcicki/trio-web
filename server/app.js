/* eslint-env node */

const path = require('path');
const express = require('express');
const compression = require('compression');
const port = process.env.PORT || 8080;
const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, './public')));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, './public/index.html')));
app.listen(port);
