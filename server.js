const http = require("http");
const fs = require('fs');
const app = http.createServer((req,res)=>{

    //set Header File
    res.setHeader('Content-type','text/html');

    //rendering route
    let path = "./views";

    switch(req.url){
        case "/":
            path +="/index.html";
            res.statusCode = 200;
            break;
        case "/about":
            path +="/about.html";
            res.statusCode = 200;
            break;
        case "/about-me":
            res.setHeader('Location','about.html');
            res.statusCode = 301;
            break;
        default:
            path +="/404.html";
            req.statusCode = 404;
            break;
    }

    //read home html file
    fs.readFile(path,(error,data)=>{
        if(error){
            console.log(error);
        }else{
            res.end(data);
        }
    })
});

app.listen(3500,'localhost',()=>{
    console.log(`Your app is running at 3500`);
});
