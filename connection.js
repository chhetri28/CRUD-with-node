const mysql=require("mysql");

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345@Pass",
    database:"sdb",
    port:3306
});
con.connect((err)=>{
    if(err) throw err;
    console.log("Connection is created..!!");
});

module.exports.con=con;