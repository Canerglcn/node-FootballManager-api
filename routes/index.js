const express = require('express');
const router = express.Router();

//Models
const Manager=require('../models/Manager');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});



router.post('/register', (req, res, next) => {
  const { team_id,username,password}=req.body;

  const manager=new Manager({
    team_id,
    username,
    password
  });

  const promise=manager.save();

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });

});




module.exports = router;
