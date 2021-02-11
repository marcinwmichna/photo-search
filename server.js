const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const serveStatic = require('serve-static');

const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());
app.all((req,res, next)=>{ 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
})
app.use('/', serveStatic(path.join(__dirname, '/public')));
// app.use(express.static("public"));
// app.use(express.static(__dirname + "/public"))

const port = process.env.PORT || 8081;

// app.get("/", (req, res)=>{
//     res.send("test from server,js");
// })
app.listen(port, () =>{
    console.log(`listening on ${port}`);
});  