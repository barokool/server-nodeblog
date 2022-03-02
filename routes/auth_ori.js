const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')


//create something new, use post method
//register 
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashpassword
        })
        const user = await newUser.save();
        res.status(200).json(user)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//login 
router.post('/login', async (req, res) => {
    // username
    const user = await User.findOne({ username: req.body.username })
    if (!user) res.status(500).json("couldnt find user")
    const validated = await bcrypt.compare(req.body.password, user.password)
    if (!validated) res.status(500).json("wrong password")

    // if dont want to json with password
    // write these code 
    // const {password,...Freename} = user._doc
    //res.status(200).json(Freename)
    res.status(200).json(user)
})
module.exports = router