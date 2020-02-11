const mongoose= require('mongoose');
const Schema=mongoose.Schema;

const TeamSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    history:{
        type:String,
        required:true,
        maxlength:200,
        minlength:20,
    },
    foundation_year:{
        type:Date,
        required:true
    },
    country:{
        type:String,
        minlength: 3,
        maxLength:50,
        required:true
    },
    location:{
        type:String
    }

});

module.exports=mongoose.model('team',TeamSchema);