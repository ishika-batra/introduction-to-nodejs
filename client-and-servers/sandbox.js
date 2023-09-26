const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
// const { result } = require('lodash');
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

// MONGOOSE AND MONGO SANDBOX ROUTES
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    // title: 'blog1',
    // snippet: 'how to make shahi paneer',
    // body: 'step1.....step2...step3....',
    title: 'blog2',
    snippet: 'how to make modak',
    body: 'step1.....step2...step3....',
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('6512b3885c0275d251bb569d')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.use((req, res, next) => {
//   console.log('new request made:');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log('in the next middleware');
//   next();
// });

// ROUTES
app.get('/', (req, res) => {
  // res.send('<p> HOME PAGE </p>');
  // res.sendFile('./views/index.html', { root: __dirname });

  // const blogs = [
  //   { title: `It's a good day`, snippet: 'blah blah blah blah' },
  //   { title: `It's raining`, snippet: 'blah blah blah blah' },
  //   { title: `different shades of pink`, snippet: 'blah blah blah blah' },
  // ];

  // res.render('index', { title: 'Home', blogs });

  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  // res.send('<p> ABOUT PAGE </p>');
  // res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

// BLOG ROUTES
app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
});

// redirect
// app.get('/about-us', (req, res) => {
//   res.redirect('/about');
// });

// app.get('/blogs/create', (req, res) => {
//   res.render('create', { title: 'Create' });
// });

// 404 error
// This should be at end of the page
// We have to manually add status code here
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html', { root: __dirname });

  res.status(404).render('404', { title: 'Error' });
});
