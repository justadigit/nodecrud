//blog controller
//blog , blog_details , blog_create_get , blog_create_post , blog_delete , blog_edit
const Blog = require('../models/blog');

const blogs = (req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then(data=>{
        res.render('blogs/index',{
            title:"All Blogs",
            blogs:data
        })
    }).catch(err=>{
        console.log(err)
    })
}

const blog_create_get = (req,res)=>{
    res.render('blogs/create',{title:'New Blog'});
}

const blog_create_post = (req,res)=>{
    const blog = new Blog(req.body);
   blog.save()
   .then(result=>{
       res.redirect('/blogs')
   }).catch(err=>console.log(err));
}

const blog_details = (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result=>{
        res.render('blogs/details',{title:"Blog Details",blog:result})
    })
}

const blog_delete = (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/blogs'})
    })
    .catch(err=>{
        console.log(err)
    })
}

const blog_edit = (req,res)=>{
    const id = req.params.id;
    const {title,snippet,body} = req.body;
    Blog.findByIdAndUpdate(id,{title:title,snippet:snippet,body:body},
        function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("Updated Blog : ", docs); 
                res.redirect('/blogs');
            } 
        });
}

module.exports = {
    blogs,
    blog_create_get,
    blog_create_post,
    blog_details,
    blog_delete,
    blog_edit
}