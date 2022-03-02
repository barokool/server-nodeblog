const express = require('express')
const router = express.Router()
const Post = require('../models/Post')


//get all post
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});
// })
//create new post
router.post('/', async (req, res) => {
    //get everything from req.body
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }
    catch (err) {
        res.status(500).json(err)
    }

})


//update post
router.put('/:id', async (req, res) => {
    //check if username == username
    try {
        const post = await Post.findById(req.params.id)
        if (post.username == req.body.username) {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body)
            res.status(200).json(updatedPost)
        }
        else res.status(401).json("Only update your post ")
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//delete post
router.delete('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)

        if (post.username == req.body.username) {
            const deletedPost = await Post.findByIdAndRemove(req.params.id, req.body)
            res.status(200).json(deletedPost)
        }
        else res.status(401).json("couldnt delete because it isnt your post")
    }
    catch (err) {
        res.status(500).json(err)
    }
})
//get post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post)
            res.status(200).json(post)
        else res.status(401).json("Dont have")
    }
    catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router