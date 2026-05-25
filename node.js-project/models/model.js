

const mongoose=require('mongoose');
const Schema1=  new mongoose.Schema({

    Name:{
        type:String,
        required:true
    },

    Email:{
        type:String,
        required:true,
        unique:true
  
        
    },

    Password:{
        type:String,
        required:true,
        unique:true,
        maxlength:8,
        minlength:8
    },
    Contact_No:
    {
        type:String,
        required:true,
        maxlength:11,
        minlength:11,
        unique:true
    }
},
{
    collection:'user-detail'
});

const model1=mongoose.model('model1',Schema1);

module.exports=model1;





