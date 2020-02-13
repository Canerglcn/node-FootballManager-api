const express = require('express');
const router = express.Router();

const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

//Models
const Manager=require('../models/Manager');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});


router.post('/register', (req, res, next) => {
  const {team_id, username, password} = req.body;

  bcryptjs.hash(password, 10).then((hash) => {

    const manager = new Manager({
      team_id,
      username,
      password: hash
    });

    const promise = manager.save();

    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });

  });

});

router.post('/login', (req, res, next) => {
  const {username,password}=req.body;

  Manager.findOne({
    username
  },(err,manager)=>{
    if(err)
      throw err;
    if(!manager){
      res.json({
      status:false,
      message:'Login failed, user not found. '
      });
    }else{
      bcryptjs.compare(password, manager.password).then((result)=>{
        if(!result)
        {
         res.json({
         status:false,
         message:'Login failed,wrong password.'
        });
       }else {
          const payload = {
            username,
            team_id: manager.team_id
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 1440 //24 hours

          });

            res.json({
              status:true,
              token
        })
        }

    });
   }

 })

});


module.exports=router;
