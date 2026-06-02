const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('ohchainn admin backend dashboard is running.');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ohchainn-admin-backend' });
});

app.listen(port, () => {
  console.log(`Admin backend listening on port ${port}`);
});
