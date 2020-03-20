import express from "express";
import { pool } from "../server.js";
export let router = express.Router();
router.post('/savedata', (req, res) => {
    let data = req.body;
    pool.query(`INSERT INTO user_info(first_name , middle_name ,last_name, email, phone, role ,address )values('${data.first_name}','${data.middle_name}','${data.last_name}','${data.email}','${data.phone}','${data.role}','${data.address}')`);
    res.send('success');
    res.status(200);
});
router.post('/updateuser:id', (req, res) => {
    const updMember = req.body;
    pool.query(`
  UPDATE user_info
  SET(first_name, middle_name, last_name, email, phone, role, address)=('${updMember.first_name}','${updMember.middle_name}','${updMember.last_name}','${updMember.email}',' ${updMember.phone}','${updMember.role}','${updMember.address}')
    WHERE 
    id = ${req.params.id};
  `);
    res.send('success');
    res.status(200);
});
