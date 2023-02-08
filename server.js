var express = require('express');
const path = require("path");
//이미지
const multer = require('multer');
var _storage = multer.diskStorage({
  destination : function (req,file,cb)  
  {
    cb(null, 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/') //어디에 저장할래?
  },
    filename : function(req,file,cb) 
  {
    cb(null,file.originalname) //이름은 뭘로할래?
  }
});
//
var bodyParser = require('body-parser');
var app = express();
var upload = multer({storage : _storage});
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

app.get('/Gangwon', function(req,res) {
  res.sendFile(__dirname + "/Gangwon.html")
  var sql ="select * from restaurant.restaurant where location = '033'";
  connection.query(sql, function(error,results){
  res.json(results);
  });
});


//------------맛집 등록--------------
app.post('/korea', upload.single("img") , function (req, res) {
  
  //console.log(req.body.name, req.body.location, req.body.input_text);
  var name = req.body.name;
  var location = req.body.location;
  var review = req.body.input_text;
  var img = `/images/{req.file.img}`;

  if(name != '')
  {
  var sql = "insert into restaurant.restaurant (name,location,img,review,t) value (?,?,?,?,now())";
  //var sql = sql = "insert into restaurant.restaurant (name,location,img,review) value (?,?,?,?)";
  var data =[name,location,img,review];
  connection.query(sql,data,function(err,row){
    if(err)
    {
      console.log('이건 에러다',err);
      res.json(err);
    }
    else
    {
      console.log('이건 성공이다',row);
      //res.json({"result": row});
      res.send(`<script>alert("맛집 등록 성공입니다");location.href="korea"</script>`);
    }
  });
  }
  else
  {
    res.send(`<script>alert("음식점 이름은 입력해야 합니다");location.href="korea"</script>`);
    return false;
  }
});
//------------맛집 등록--------------


//app.post('/ajax',function(req,res){
//  var sql = 'SELECT * FROM test.user';
  
//  var responseData = `${req.body.name} `;
//var name = `${req.body.name} `;
//var location = `${req.body.location} `;
//res.json(name);
//res.json(location);
//  res.json(responseData);
//connection.query(sql, function(error,results){
//  res.json(results);
//  console.log(results);
  
//  });
  /* var name = req.body.name;
  console.log(name);*/
//});

