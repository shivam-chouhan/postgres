import express from "express";
import { pool } from "../server.js";
export let router1 = express.Router();

router1.get('/users',(req,res)=>{
  pool.query(`select * from users 
  join customers on customer=customer_id
  join role on role_id=key`)
               .then((result )=>
               {
                 res.json(result.rows);
               });
})
router1.get('/customers',(req,res)=>{
  pool.query(`select * from customers`)
             .then((result)=>
             {
               res.json(result.rows);
             });
})