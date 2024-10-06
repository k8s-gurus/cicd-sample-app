// app.js
const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello from the CI/CD pipeline! Running on cicd.k8sgurus.us');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});