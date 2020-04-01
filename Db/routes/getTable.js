import express from "express";
import { pool } from "../server.js";
export let router1 = express.Router();
router1.get('/getUsers', (req, res) => {
    pool.query('select * from user_info order by id asc')
        .then((result) => {
        res.json(result.rows);
    });
});
