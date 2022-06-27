const express= require("express");
const app=express();
const port=3004;
const mysql=require("./connection").con;
app.set("view engine","hbs");
app.set("views","./views");
app.use(express.static(__dirname + "/public"));
app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/add",(req,res)=>{
    res.render("add");
});
app.get("/search",(req,res)=>{
    res.render("search");
});
app.get("/update",(req,res)=>{
    res.render("update");
});
app.get("/delete",(req,res)=>{
    res.render("delete");
});
app.get("/view",(req,res)=>{
    res.render("view");
});

app.get("/addstudent",(req,res)=>{
    //Fetching data
    // res.send(req.query);
    const {name,phone,email,gender}=req.query;
    //sanitization XSS....
    let qry="select * from test where email=? or phone=? ";
    mysql.query(qry,[email,phone],(err,results)=>{
        if(err) throw err;
        else{
            if(results.length >0){
                res.render("add", { checkmesg: true });
            }else{
                //insert query
                let qry2 = "insert into test values(?,?,?,?)";
                mysql.query(qry2, [name, phone, email, gender], (err, results) => {
                    if (results.affectedRows > 0) {
                        res.render("add", { mesg: true })
                    }
                });
            }
        }
    });
});
//create Server
app.listen(port,(err)=>{
    if(err) throw err;
    else 
    console.log("server is running at port %d",port);
});