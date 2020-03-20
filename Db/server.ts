import fs from "fs";
import express, { urlencoded } from "express";
import { router } from "./routes/CUops.js";
import { router2 } from "./routes/deleteRow.js";
import {router1} from "./routes/getTable.js"
import cors from "cors";
import pg from 'pg'
const { Pool } = pg

function pass(){
    return 'Shivam123'
}

export const pool = new Pool({
    user:'postgres',
    host:'localhost',
    port:5432,
    password:pass(),
    database:'users_table',


})

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());
app.use('/CUops', router,)
app.use('/getTable', router1)
app.use('/deleteRow',router2)
app.use(express.urlencoded({extended: false}));
app.use(cors());

const PORT = process.env.PORT || 5000;


 app.listen(PORT, ()=>{
     console.log("this server now starts at port "+PORT);
 })