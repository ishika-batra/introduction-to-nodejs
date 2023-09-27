const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
// express app
const app = express();

// connect to mongodb
const dbURI =
  'mongodb+srv://Ishika:Ishu2203@cluster0.7j1pp7a.mongodb.net/database1?retryWrites=true&w=majority&appName=AtlasApp';
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// MIDDLEWARE AND STATIC FILES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// THIRD PARTY MIDDLEWARE
app.use(morgan('dev'));

// ROUTES
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: 'Error' });
});
