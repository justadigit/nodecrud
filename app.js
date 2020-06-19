const express = require("express");

// express app
const app = express();

//home page route
app.get('/',(req,res)=>{
    res.sendFile('./views/index.html',{root:__dirname});
})

//about page route
app.get('/about',(req,res)=>{
    res.sendFile('./views/about.html',{root:__dirname});
})

//redirect about page
app.get('/about-me',(req,res)=>{
    res.redirect('/about');
})

//404 page
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{root:__dirname});
})

//listen app for request
app.listen(3500,()=>{
    console.log("Your App is running at 3500!");
})
