const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const mysql2= require('mysql2')
const q = mysql2.createConnection({
   host:'localhost',
   database:'nodedb1',
   user:'root',
   password:''
})
app.use(express.json());

app.post('/addproduct' , (req , res)=>{
   const {name,price,description}=req.body
   q.execute(`Insert into products (name,price,description) Values ('${name}','${price}','${description}')`);
   res.json({message:'sucsess'})
})

app.put('/update' , (req , res)=>{
   const {name,id,price,description}=req.body
   q.execute(`update products set name='${name}',price=${price} , description='${description}' where id='${id}' `);
   res.json({message:'sucsess'})
})

app.delete('/delete' , (req , res)=>{
   const {id}=req.body
   q.execute(`delete from products  where id='${id}'`);
   res.json({message:'sucsess'})
})


app.get('/allproducts' , (req,res)=>{
   q.execute(`select * from products` , (err , result)=>{
      res.json({message:"sucsess" ,user:result});
   });
   
})



app.listen(3001,()=>{
   console.log('server is running.....');
})