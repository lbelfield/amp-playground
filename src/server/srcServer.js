import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../../webpack.config.dev';
import open from 'open';

import { createServer } from "http";

/* eslint-disable no-console */

const port = 8080;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../client/hotels.html'));
});

const server = createServer(app).listen(port, () => {
  console.log('server running at ' + port);
  open(`http://localhost:${port}`);
});
