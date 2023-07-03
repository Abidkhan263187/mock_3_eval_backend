const express = require('express')
require('dotenv').config()
const cors=require("cors");


const { connection } = require('./config/db');
const { dashBoardRouter } = require('./RouterController/dashboardRouter');
const { userRouter } = require('./RouterController/userRouter');


const app = express();
app.use(express.json())

app.use(cors({
    origin: '*'
  })) 


app.use('/', userRouter)

app.use('/dashboard', dashBoardRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("connection established")
    } catch (error) {
        console.log("error connecting to db", error)
    }
    console.log('listening on port', process.env.PORT);
})


