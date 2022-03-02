const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
//create new category
router.post('/', async (req, res) => {
    try {
        const newCategory = new Category(req.body)
        const savedCategory = await newCategory.save()
        res.status(200).json(savedCategory)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get


module.exports = router