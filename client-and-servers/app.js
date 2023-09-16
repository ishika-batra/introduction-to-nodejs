const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
  // res.send('<p> HOME PAGE </p>');
  res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  // res.send('<p> ABOUT PAGE </p>');
  res.sendFile('./views/about.html', { root: __dirname });
});

// redirect
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 error
// This should be at end of the page
// We have to manually add status code here
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
});
