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

router.get('/freeagent', (req, res, next) => {
    const promise=Footballer.find({
        team_id:{
            $exists:false
        }
    });

    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

router.get('/:footballer_id', (req, res, next) => {
    const promise=Footballer.findById(req.params.footballer_id);

    promise.then((footballer)=>{
        if(!footballer)
            next({message:'The footballer is not found'});
        res.json(footballer);
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


router.put('/:footballer_id', (req, res, next) => {
    const promise=Footballer.findByIdAndUpdate(
        req.params.footballer_id,
        req.body,
        {
        new:true
        }
    );

    promise.then((footballer)=>{
        if(!footballer)
            next({message:'The footballer is not found'});
        res.json(footballer);
    }).catch((err)=>{
        res.json(err);
    });
});

router.delete('/:footballer_id', (req, res, next) => {
    const promise=Footballer.findByIdAndRemove(req.params.footballer_id);

    promise.then((footballer)=>{
        if(!footballer)
            next({message:'The footballer is not found'});
        res.json({status:1});
    }).catch((err)=>{
        res.json(err);
    });
});

router.get('/:position_number/top10', (req, res, next) => {
    const promise=Footballer.aggregate([
        {
            $match: {
                position_number:parseInt(req.params.position_number)
            }
        },
        {
            $project: {
                position_number: 1,
                name:1,
                surname:1,
                rating:1,
                age:1
            }
        }
    ]).sort({'rating':-1}).limit(10);

    promise.then((footballer)=>{
        if(!footballer)
            next({message:'The footballer is not found'});
        res.json(footballer);
    }).catch((err)=>{
        res.json(err);
    });
});



module.exports = router;
