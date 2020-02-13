const mongosoe=require('mongoose');
const Schema=mongosoe.Schema;

const ManagerSchema=new Schema({
   team_id:{
     type:Schema.Types.ObjectId,
     default:null
   },
    username:{
       type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }

});

module.exports=mongosoe.model('manager',ManagerSchema);