const mongoose=require('mongoose');
const express = require('express');
const router = express.Router();

const Team=require('../models/Team');


router.get('/', (req, res, next) => {
    const promise=Team.aggregate([
      {
          $lookup:{
            from:'footballers',
            localField:'_id',
            foreignField:'team_id',
            as:'footballers'
          }
      },
      {
         $unwind:{
            path:'$footballers',
            preserveNullAndEmptyArrays:true
         }
      },
      {
          $group:{
            _id:{
                _id:'$_id',
                name:'$name',
                history:'$history',
                foundation_year:'$foundation_year',
                country:'$country',
                location:'$location'
            },
            footballers:{
                $push:'$footballers'
            }
          }
      },
      {
          $project:{
              _id:'$_id._id',
              name:'$_id.name',
              country:'$_id.country',
              footballers:'$footballers'
          }
      }
    ]);


    promise.then((teams)=>{
      res.json(teams);
    }).catch((err)=>{
      res.json(err);
    })
});


router.get('/:team_id', (req, res, next) => {
  const promise=Team.aggregate([
    {
      $match:{
        '_id':mongoose.Types.ObjectId(req.params.team_id)
      }
    },
    {
      $lookup:{
        from:'footballers',
        localField:'_id',
        foreignField:'team_id',
        as:'footballers'
      }
    },
    {
      $unwind:{
        path:'$footballers',
        preserveNullAndEmptyArrays:true
      }
    },
    {
      $group:{
        _id:{
          _id:'$_id',
          name:'$name',
          history:'$history',
          foundation_year:'$foundation_year',
          country:'$country',
          location:'$location'
        },
        footballers:{
          $push:'$footballers'
        }
      }
    },
    {
      $project:{
        _id:'$_id._id',
        name:'$_id.name',
        country:'$_id.country',
        footballers:'$footballers'
      }
    }
  ]);


  promise.then((teams)=>{
    res.json(teams);
  }).catch((err)=>{
    res.json(err);
  })
});


router.post('/new', (req, res, next) => {

  const team=new Team(req.body);
  const promise=team.save();

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });

});

router.put('/:team_id', (req,res,next)=>{
     const promise=Team.findByIdAndUpdate(
        req.params.team_id,
        req.body,
         { new:true}
      );

     promise.then((team)=>{
      if(!team)
        next({message:'The team is not found'});
      res.json(team);
     }).catch((err)=>{
       res.json(err);
     });
});

router.delete('/:team_id', (req,res,next)=>{
  const promise=Team.findByIdAndRemove(req.params.team_id);

  promise.then((team)=>{
    if(!team)
      next({message:'The team is not found'});
    res.json({status:1});
  }).catch((err)=>{
    res.json(err);
  });
});


module.exports = router;
