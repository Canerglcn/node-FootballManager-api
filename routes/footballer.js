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
    const footballer=new Footballer({
        name:'caner',
        surname:'canerovic',
        position_number: 21,
        datebirth: '19800810',
        country:'Turkey',
        rating:'80'
    });
    footballer.save((err,data)=>{
        if(err)
            console.log(err);

        res.json(data);
    });
});

module.exports = router;
