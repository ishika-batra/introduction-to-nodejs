const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();
// BLOG ROUTES
// GET ALL BLOGS
router.get('/', blogController.blog_index);
// CREATE A BLOG
router.post('/', blogController.blog_create_post);
// CREATING NEW BLOG
router.get('/create', blogController.blog_create_get);
// GET A SINGLE BLOG BY ID
router.get('/:id', blogController.blog_details);
//DELETE A SINGLE BLOG BY ID
router.delete('/:id', blogController.blog_delete);

module.exports = router;
