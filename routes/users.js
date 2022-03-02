const express = require('express')
const router = express.Router()
const User = require('../models/User')


//update user, use put method 
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.status(200).json(updatedUser)
    }
    catch (err) {
        res.status(500).json(err)
    }

})

//delete

//get user

module.exports = router