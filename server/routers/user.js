const express = require("express")
const User = require("../models/user")
const router = express.Router()
const {registerUser, loginUser, editUser, deleteUser, getAllUsers} = require("../models/user");

router.post("/signup", registerUser)

router.post("/signIn", loginUser)

router.put("/edit:id", editUser)

router.delete("/delete:id", deleteUser)

router.get("/all", getAllUsers)

module.exports = router;