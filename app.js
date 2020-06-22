const express = require("express");

// express app
const app = express();

//register view engine
app.set("view engine","ejs");

//require
const PORT = process.env.PORT || 3500;


//home page route
app.get('/',(req,res)=>{
    const blogs = [
        {title:"New Schedule",snippet:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},
        {title:"How to do",snippet:'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
        {title:"Work Early",snippet:'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
    ]
    res.render('index',{title:'Home',blogs})
})

//about page route
app.get('/about',(req,res)=>{
   res.render('about',{title:"About"})
})

//create blog route
app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'New Blog'});
})


//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
})

//listen app for request
app.listen(PORT,()=>{
    console.log("Your App is running at 3500!");
})
