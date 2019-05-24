const express = require('express');
// const http = require('http');
const morgan = require('morgan');
const bodyParser =require ('body-parser');
const mongoose = require('./db/connectdb');
const cors = require('cors');

const userRouter = require('./users/userRouter');
const authRouter = require('./auth/authRouter');
// const router = require('./router'); 

// DB Setup 
mongoose

// App setup
const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
// router(app);
app.use("/users", userRouter)
app.use("/auth", authRouter)

// Server setup ...
const port = process.env.PORT || 3090
app.listen(port,()=>{
    console.log('Server listening on: ', port);
})

// const server = http.createServer(app);
// server.listen(port);
// console.log('Server listening on: ', port);
