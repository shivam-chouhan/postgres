import express from "express"
import { pool} from "../server.js";
import { DataType } from "../interface.js";
export let router = express.Router();

router.get('/users',(req,res)=>{
  pool.query('select * from user_info order by id asc')
               .then((result )=>
               {
                 res.json(result.rows);
               });
})


router.get('/users:id', (req,res)=> {
    pool.query(`DELETE FROM user_info WHERE id = ${parseInt(req.params.id)}`)
    console.log(req.params.id)
    res.send('success')
})

router.post('/savedata',(req , res)=>{
  let data = req.body;
  console.log(data)
  pool.query(`INSERT INTO user_info(first_name , middle_name ,last_name, email, phone, role ,address )values('${data.first_name}','${data.middle_name}','${data.last_name}','${data.email}','${data.phone}','${data.role}','${data.address}')`)
  res.send('success');
  res.status(200)
})



router.post('/updateuser:id', (req , res)=>{
  const updMember:DataType = req.body;
  pool.query(`
  UPDATE user_info
  SET(first_name, middle_name, last_name, email, phone, role, address)=('${updMember.first_name}','${updMember.middle_name}','${updMember.last_name}','${updMember.email}',' ${updMember.phone}','${updMember.role}','${updMember.address}')
    WHERE 
    id = ${req.params.id};
  `)
  res.send('success');
  res.status(200);
})
