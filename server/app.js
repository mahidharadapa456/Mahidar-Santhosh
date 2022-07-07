require("dotenv").config()
const express = require("express")
const app = express()
const db = require("./database/mongoose")


const port = process.env.PORT || 5000
const userRouter = require("./routers/user")
const postRouter = require("./routers/post")


app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-requested-with, Authorization, Accept, Content-Type")
    res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, PATCH, POST, OPTIONS")
    next()
})
app.use("/user", userRouter)
app.use("/post", postRouter)



app.listen(port, () => {
    console.log(`Starting on ${port}`)
})