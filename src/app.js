const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet=require('helmet')
const userRouter=require("./routers/user.router")
const app = express();
app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(helmet());
app.use(cors()); 
app.use("/api",userRouter)

require("dotenv").config({ path: "./config/dev.env" });
require("./db/mongoose");
const PORT = process.env.PORT || 3000;

app.get("/",(req, res)=>{ 
 res.send("Hi, This  is user-admin panel...")
})
const server = app.listen(PORT, () =>
  console.log(`server running on port ${PORT}`)
);