import express from "express";
import { pool } from "../server.js";
export let router2 = express.Router();
router2.get('/users:id', (req, res) => {
    pool.query(`DELETE FROM user_info WHERE id = ${parseInt(req.params.id)}`);
    res.send('success');
});
