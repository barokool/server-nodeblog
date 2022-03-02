const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const path = require("path");
//import 
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
const postRoute = require('./routes/posts')

dotenv.config()

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Mongodb works")).catch(err => console.log(err))

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/posts', postRoute)


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Port is listenning at 5000 `))
