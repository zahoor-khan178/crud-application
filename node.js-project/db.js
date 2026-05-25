

const mongoose=require('mongoose');

function   database_connection(){

    const connect=mongoose.connect('mongodb://localhost:27017/user')
    .then((data)=>{

        console.log('db connected successfuly')
    }).catch((err)=>{

        console.log('error connecting to db',err)
    });

}


module.exports=database_connection();



  



