import express from "express";
import { pool } from "../server.js";
export let router = express.Router();
router.post('/saveUser', (req, res) => {
    let data = req.body;
    pool.query(`INSERT INTO users("firstName" ,"middleName" ,"lastName", email, phone, "roleId" ,address, customer,"createdOn" )values('${data.firstName}','${data.middleName}','${data.lastName}','${data.email}','${data.phone}',${data.roleId},'${data.address}',${data.customerId},now())`);
    res.send('success');
    res.status(200);
});
router.post('/updateUser/:id', (req, res) => {
    const updMember = req.body;
    pool.query(`
  UPDATE users
  SET("firstName", "middleName", "lastName", email, phone, "roleId", address, customer,"modifiedOn")=('${updMember.firstName}','${updMember.middleName}','${updMember.lastName}','${updMember.email}','${updMember.phone}',${updMember.roleId},'${updMember.address}',${updMember.customerId},now())
    WHERE 
    id = ${req.params.id};
  `);
    res.send('success');
    res.status(200);
});
