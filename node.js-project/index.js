

const express=require('express');
const connection=require('./db');
const routes=require('./routing');
const dbmodel=require('./models/model')
const path=require('path');


const app=express();






console.log(connection);
app.set('view engine','ejs');
const viewpath=path.join(__dirname,'views');
app.set('views',viewpath);


// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 app.use("/users",routes);


// path for static file of css in the layout folder

const layoutpath=path.join(__dirname,'layout');
app.use(express.static(layoutpath));



app.listen(7000,async()=>{
    
    try{

        console.log('server is running on port 7000');
    }
    catch{
        console.log('server is not started');
        
    }
})