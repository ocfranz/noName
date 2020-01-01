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
router.get('/getPosts', async (req, res, next) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message : err});
    }
});

router.get('/getPost/:postId', async (req, res, next) =>{
    try{
        const { postId } = req.params;
        const post = await Post.findById( postId );
    }catch(err){
        res.json({message : err})
    }
});

router.delete('/deletePost/:postId', async (req, res, next) =>{
    try{
        const deletedPost = await Post.remove({ _id : req.params.postId});
        res.json(deletedPost);
    }catch(err){
        res.json({ message : err });
    }
});

module.exports = router;