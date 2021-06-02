const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/auth.routes')
const corsMiddleware = require('./middleware/cors.middleware')

const app = express()
const PORT = config.get('serverPORT')

app.use(corsMiddleware)
app.use(express.json())
app.use('/api/auth', authRouter)

const start = async () =>{
    try {
        await mongoose.connect(config.get('dbURL'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

         app.listen(PORT||5000, ()=>{
            console.log('Server has been started on port',PORT)
        })
        
    } catch (error) {
        console.log(error)
    }
}

start()