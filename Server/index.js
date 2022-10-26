import express from "express";
import mysql2, { createConnection } from "mysql2";
import cors from "cors";

//creating a express app -server
const app = express();
const port=process.env.PORT || 8800;
//cors help us to Connect Client With Server
app.use(cors());

//middleware- help to pass JSON File over Server
app.use(express.json());



//lets connect with Database
// const cn=mysql2.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Supratim@2001',
//     database:'mydb',
// })

//lets connect with Online Database
const cn=mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Supratim@2001',
    database:'mydb',
})

//just Checking the Connections
cn.connect(function(err){
    if(err) throw err;
    else console.log("Connect");
 });

//activeting the Serever Just to Check
app.get("/",(req,res)=>{
    res.json("Hello There!");
})

//Get all Books
app.get("/books",(req,res)=>{
    var sql="SELECT * FROM book"
    cn.query(sql,function(err,result){
        if(err){
            console.log(err);
            return res.json(err);
        }
        else{
            // console.log(result);
            return res.json(result);
        }
    });
});
    
//Add Books 
app.post("/books",(req,res)=>{
    var sql="Insert into book (title,bookholder,price,contact,cover,author) values (?);"

    var values=[
        req.body.title,
        req.body.bookholder,
        req.body.price,
        req.body.contact,
        req.body.cover,
        req.body.author
    ]

    cn.query(sql,[values],function(err,result){
         if(err) return res.send(err);
         return res.json(result);
    })

})

//Delete Books
app.delete("/books/:id",(req,res)=>{
    var bookId=req.params.id;
    var sql="Delete from book where id= ? "
    cn.query(sql,[bookId],function(err,result){
        if(err) return res.send(err);
        return res.json(result);
    });
});

//Update Book
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  }); 

//listing on some port for the express server
app.listen(port ,() => {
    console.log("Backend is Ready!")
});