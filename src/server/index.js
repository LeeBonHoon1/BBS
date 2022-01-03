const express = require('express')
const app = express()
const cors = require("cors");
const port = 4000
const mysql = require('mysql');  //My-sql을 사용하였다.
const mybatisMapper = require('mybatis-mapper');  //매핑할 마이바티스
const connect = require("./connect")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
}

//흔히 알고있는 매퍼로드(xml이 있는 디렉토리 주소&파일위치를 입력하여주세요!!!)
// mybatisMapper.createMapper(['./server/testMapper.xml']);  //예) xml파일이 D드라이브에 있다면, D:/매퍼.xml
mybatisMapper.createMapper(['/Users/perfectday/Desktop/bbs/src/server/testMapper.xml']);  //예) xml파일이 D드라이브에 있다면, D:/매퍼.xml

app.use(cors(corsOptions))

var format = {language: 'sql', indent: '  '};

app.get('/', (req, res) => {
  const connection = mysql.createConnection(connect.OPTION);
  const query = mybatisMapper.getStatement('testMapper', 'selectBbs', {}, connect.FORMAT);

  connection.query(query, function (error, results, fields) {  //조회
    if (error) {
        console.log(error);
    }
    // console.log(results[0].TITLE);
    res.json(results);
  });

  connection.end();
})

app.post('/insert', (req, res) => {

  console.log(req.body)

  const connection = mysql.createConnection(connect.OPTION);


  const query = mybatisMapper.getStatement('testMapper', 'insertBbs', req.body, connect.FORMAT);

  connection.query(query, function (error, results, fields) { 
    // console.log(fields) //조회
    if (error) {
        console.log(error);
    }
    res.json(results)
  });
  
  connection.end();
})

app.post('/delete', (req, res) => {

  const connection = mysql.createConnection(connect.OPTION);


  const query = mybatisMapper.getStatement('testMapper', 'deleteBbs', req.body, connect.FORMAT);

  connection.query(query, function (error, results, fields) { 
    console.log(fields) //조회
    if (error) {
        console.log(error);
    }
    res.json(results);
  });

  connection.end();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})