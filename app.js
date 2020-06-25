const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//connect to DB
const DBURI = "mongodb+srv://naywin:naywin23@cluster0-urly7.mongodb.net/nodecrash?retryWrites=true&w=majority";

mongoose.connect(DBURI,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(data=>console.log('success to connect'))
.catch(err=>console.log(err));


// express app
const app = express();


//register view engine
app.set("view engine","ejs");

//require
const PORT = process.env.PORT || 3500;


//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))

//static 
app.use(express.static('public'))

//home page route
app.get('/',(req,res)=>{
    res.redirect('/blogs');
})

//about page route
app.get('/about',(req,res)=>{
   res.render('about',{title:"About"})
})

//for blogs
//all blogs route
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then(data=>{
        res.render('index',{
            title:"All Blogs",
            blogs:data
        })
    }).catch(err=>{
        console.log(err)
    })
})

//create blog route
app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'New Blog'});
})

//post route
app.post('/blogs',(req,res)=>{
   const blog = new Blog(req.body);
   blog.save()
   .then(result=>{
       res.redirect('/blogs')
   }).catch(err=>console.log(err));
})

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result=>{
        res.render('details',{title:"Blog Details",blog:result})
    })
})
app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/blogs'})
    })
    .catch(err=>{
        console.log(err)
    })
})
app.post('/blogs/update/:id',(req,res)=>{
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
});



// //add new blog
// app.get('/add-blog',(req,res)=>{
//     const blog =new Blog({
//         title:"my new blog",
//         snippet:"note more for my new blog",
//         body:"more and more for my new blog"
//     });
//     blog.save()
//     .then(data=>res.send(data))
//     .catch(err=>res.send(err));
// })

// //reterive all blogs
// app.get('/all-blogs',(req,res)=>{
//     Blog.find()
//     .then(data=>res.send(data))
//     .catch(err=>res.send(err))
// })

//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
})


//listen app for request
app.listen(PORT,()=>{
    console.log("Your App is running at 3500!");
})
