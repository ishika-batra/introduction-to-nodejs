const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
  // res.send('<p> HOME PAGE </p>');
  // res.sendFile('./views/index.html', { root: __dirname });

  const blogs = [
    { title: `It's a good day`, snippet: 'blah blah blah blah' },
    { title: `It's raining`, snippet: 'blah blah blah blah' },
    { title: `different shades of pink`, snippet: 'blah blah blah blah' },
  ];

  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  // res.send('<p> ABOUT PAGE </p>');
  // res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

// redirect
// app.get('/about-us', (req, res) => {
//   res.redirect('/about');
// });

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create' });
});

// 404 error
// This should be at end of the page
// We have to manually add status code here
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });

  res.status(404).render('404', { title: 'Error' });
});