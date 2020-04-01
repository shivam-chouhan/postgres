import express from "express";
import { pool } from "../server.js";
export let router = express.Router();
router.post('/savedata', (req, res) => {
    let data = req.body;
    console.log(data);
    pool.query(`INSERT INTO users(first_name , middle_name ,last_name, email, phone, role_id ,address, customer )values('${data.first_name}','${data.middle_name}','${data.last_name}','${data.email}','${data.phone}',${data.role_id},'${data.address}',${data.customer_id})`);
    res.send('success');
    res.status(200);
});
router.post('/updateuser:id', (req, res) => {
    const updMember = req.body;
    pool.query(`
  UPDATE users
  SET(first_name, middle_name, last_name, email, phone, role_id, address, customer)=('${updMember.first_name}','${updMember.middle_name}','${updMember.last_name}','${updMember.email}','${updMember.phone}',${updMember.role_id},'${updMember.address}',${updMember.customer_id})
    WHERE 
    id = ${req.params.id};
  `);
    res.send('success');
    res.status(200);
});
