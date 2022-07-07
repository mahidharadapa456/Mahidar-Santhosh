const express = require("express")
const router = express.Router();
const Post = require("../models/post")

router.post("/createPost", async(req, res) => {
    let post = new Post(req.body)
    try {
        post = await post.save()
        if(!post) return res.send({message: "Error while creating post"})
        res.send({message: "Success", post})
    } catch (e) {
        res.send({message: "Error", error: e})
    }
})

router.put("/editPost/:id", async(req, res) => {
    let _id = req.params.id;
    try {
        const post = await Post.findOneAndUpdate(_id, req.body)
        if(!post) return res.send({ message: "Error"})
        res.send({message: "Success", post})
    } catch(e) {
        res.send(e)
    }
})

router.delete("/deletePost/:id",
    async (req, res) => {
        debugger
        const _id = req.params.id
        console.log(req.params)
        try {
            const post = await Post.deleteOne({_id: _id})
            if (!post) return res.send({message: "Post not found"})
            res.send({message: "Deleted", post})
        } catch (e) {
            res.send({message: "Internal server error"})
        }
    })

router.get("/allPosts", async(req, res) => {
    try {
        const post = await Post.find()
        console.log(post)
        if(!post) return res.send("Post not found")
        res.send({message: "Posts found", post})
    } catch (e) {
        res.send({message: "internal error", error: e})
    }
})

router.get("/userPosts/:userId", async (req, res) => {
    const userId = req.params.userId

    try{
        const userPost = await Post.find({postOwner: userId}).populate('postOwner')
        console.log(userPost)
        if(!(userPost.length > 0)) return res.status(200).send({message: "Any post not found", userPost})

        res.json(userPost)
    } catch (e) {
        res.status(500).send({
            message: "Error occurred"
        })
    }
})

module.exports = router;