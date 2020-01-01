const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const path = require('path');

const Post = require('../models/Post');

mongoose.connect(process.env.DATABASE_CONNECTION,
    {useUnifiedTopology: true, useNewUrlParser : true}
    , (err)=>{
    if(err){
        console.log('Error', err);
    }else{
        console.log('Conected');
    }
})

router.post('/savePost', (req, res, next)=>{
    const {title, description } = req.body;
    const post = new Post({title: title, description: description});
    post.save()
        .then( data => {
            res.json(data);
        })
        .catch(err =>{
        res.json({ error : err})
        })
});
router.get('/getSomething', (req, res, next) => {
  res.send({ status : 'OK'})
});

module.exports = router;