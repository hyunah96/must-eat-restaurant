var express = require('express');
const path = require("path");
var bodyParser = require('body-parser');
var app = express();
app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//cors정책을 피하기 위한 모듈
const cors = require('cors')
app.use(cors());

var mysql      = require('mysql');
const { query, response, Router } = require('express');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'kgb0563',
  database : 'test'
});
// 3000 포트로 서버 오픈
app.listen(3000, function() {
    console.log("server is running")
});


//public 폴더의 내용을 읽겠다
app.use(express.static('public'));

//메인 페이지를 index.html
app.get('/', function(req,res) {
  res.sendFile(__dirname + "/index.html")
});

app.get('/korea', function(req,res) {
  res.sendFile(__dirname + "/korea.html")
});

app.post('/ajax',function(req,res){
  var sql = 'SELECT * FROM test.user';
  
  //var responseData = `hi ${req.body.name} i'm balmostory`;
  //res.json(responseData);
connection.query(sql, function(error,results){
  res.json(results);
  console.log(results);
  
  });
  /* var name = req.body.name;
  console.log(name);*/
});


 /* var name = req.body.name;
  console.log(name);*/

