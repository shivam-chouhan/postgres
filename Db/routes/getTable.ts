import express from "express";
import { pool } from "../server.js";
export let router1 = express.Router();

router1.get('/getUsers',(req,res)=>{
  pool.query(`SELECT * FROM users 
  JOIN customers ON customer="customerId"
  JOIN role ON "roleId"=key ORDER BY id ASC`)
               .then((result )=>
               {
                 res.json(result.rows);
               });
})
router1.get('/getCustomers',(req,res)=>{
  pool.query(`select * from customers`)
             .then((result)=>
             {
               res.json(result.rows);
             });
})