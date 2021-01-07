const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('config')

// set up express 

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/auth', require('./routes/user.Routes'))

// set up config 

const url = config.get('url')
const PORT = config.get('port') || 5000


// set up mongoose and app

function start() {
    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`Приложение стартанула на сервере: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

