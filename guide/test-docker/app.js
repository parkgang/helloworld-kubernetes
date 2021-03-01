const express = require('express');
const app = express();
const port = 6060;

const createMessage = (text, req, res) => {
  const message =
    `message: ${text} <br />` +
    `req.method: ${req.method} <br />` +
    `req.url: ${req.url} <br />` +
    `req.originalUrl: ${req.originalUrl} <br />` +
    `req.url: ${req.url} <br />`;
  return message;
};

app.get('/v1', (req, res) => {
  res.send(createMessage('/v1', req, res));
});

app.get('/v2', (req, res) => {
  res.send(createMessage('/v2', req, res));
});

app.get('/v3', (req, res) => {
  res.send(createMessage('/v3', req, res));
});

app.get('/v1/v1', (req, res) => {
  res.send(createMessage('/v1/v1', req, res));
});

app.get('/v1/v2', (req, res) => {
  res.send(createMessage('/v1/v2', req, res));
});

app.get('/v1/v3', (req, res) => {
  res.send(createMessage('/v1/v3', req, res));
});

app.get('*', (req, res) => {
  res.send(createMessage('*', req, res));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
