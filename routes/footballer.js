const express = require('express');
const router = express.Router();


const Footballer=require('../models/Footballer');

router.get('/', (req, res, next) => {
    const promise=Footballer.find({ });

    promise.then((data)=>{
    res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});


router.post('/new', (req, res, next) => {

    const footballer=new Footballer(req.body);

    const promise=footballer.save();
    promise.then((data)=>{
    res.json(data);
    }).catch((err)=>{
    res.json(err);
    });

});

module.exports = router;
