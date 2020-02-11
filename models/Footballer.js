const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const FootballerSchema=new Schema({
    team_id:Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    position_number:{
        type:Number,
        required:true,
        min:1,
        max:99
        //unique:true
    },
    age:{
        type:Number,
        max:50,
        min:15
    },
    country: {
     type:String,
    },
    rating: {
        type:Number,
        required:true,
        max:99,
        min:35
    }

});

module.exports=mongoose.model('footballer',FootballerSchema);