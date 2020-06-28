const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { blog_create_get } = require('../controllers/blogController');
//all blogs route
router.get('/',blogController.blogs)

//create blog route
router.get('/create',blog_create_get)

//post route to insert blog
router.post('',blogController.blog_create_post)

//blog details
router.get('/:id',blogController.blog_details)

//blog delete
router.delete('/:id',blogController.blog_delete)

//blog edit
router.post('/update/:id',blogController.blog_edit)

//add new blog
router.get('/add-blog',(req,res)=>{
    const blog =new Blog({
        title:"my new blog",
        snippet:"note more for my new blog",
        body:"more and more for my new blog"
    });
    blog.save()
    .then(data=>res.send(data))
    .catch(err=>res.send(err));
})

//reterive all blogs
router.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then(data=>res.send(data))
    .catch(err=>res.send(err))
})

module.exports = router;