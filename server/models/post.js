const mongoose = require("../database/mongoose")
const {Schema} = require("mongoose");

const postSchema = new mongoose.Schema({
    postTitle: {
        type: String
    },
    postContent: {
        type: String
    },
    category: {
        type: String
    },
    postOwner: {type: Schema.Types.ObjectId, ref: "User"}
})

const Post = mongoose.model("Post", postSchema)


module.exports = Post;