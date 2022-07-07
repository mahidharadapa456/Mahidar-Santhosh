
const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => {
                if(!isEmail(v)) {
                    throw new Error("Invalid email, please enter valid mail address")
                }
            }
        }
    },
    password: {
        type: String,
        required: true,
        min: [5, 'Password must be more than 5 characters long']

    }
})

const User = mongoose.model("User", userSchema)

async function registerUser (req, res) {
    if(!Object.keys(req.body).length > 0) return res.sendStatus(400)
    const encodedPassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = encodedPassword;

    let user = new User(req.body)
    try {

        const duplicateUser = await User.findOne({ $or: [{userEmail: user.userEmail}, {userName: user.userName}]})
        if(duplicateUser) return res.status(500).send({
            message: `User already exist following email or username: ${user.userEmail} or ${user.userName}`,
            ok: false
        })

        user = await user.save()
        if(!user) return res.status(500).send({message: "Error while creating user"})

        res.json(user)
    } catch (e) {

        res.status(500).send({message: "Internal server error", error: e})
    }
}

async function loginUser(req, res) {
    const data = req.body;

    try{
        const user = await User.findOne({userEmail: data.userEmail})
        if(!user) return res.status(404).send({message: `User Not found following email: ${data.userEmail}`})

        const decodedPassword = await bcrypt.compare(data.password, user.password)
        if(!decodedPassword) return res.status(404).send({message: 'No match to password'})

        res.json({message: "Login success", user})
    }catch (e){
        res.status(500).json({message: "Error", error: e})
    }
}

async function editUser (req, res){
    let id = req.params.id;
    try {
        let user = await User.findOne({_id: id})
        if(!user) return res.status(404).send({ message: `User not found`})

        user = req.body;
        user.save()

        res.send({ message: "Updated successfully", user})
    } catch (e) {
        res.send({message: "Internal server error", error: e})
    }
}

async function deleteUser (req, res) {
    let id = req.params.id
    try {

        const user = await User.deleteOne({_id: id})
        if(!user) return res.send({message: "User not found"})

        res.status(200).send("Deleted successfully")
    } catch(e) {
        res.send({message: "Internal error while deleting user"})
    }

}

async function getAllUsers (req, res){
    try{

        const user = await User.find()
        if(!user) return res.send({ message: "Users not found" })

        res.send(user)
    } catch(e) {
        res.send({ message: "Internal error"})
    }
}

module.exports = {registerUser, loginUser, editUser, deleteUser, getAllUsers};