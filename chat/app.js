const express = require('express'); // 세팅에 필요한 모듈 require로 가져와 변수에 담기
const http = require('http');// http는 node.js의 기본 모듈이므로 다운로드 하지 않아도 됨.
const app = express();// app은 express 객체
const server = http.createServer(app);//서버 생성 메소드 createServer 이용하여 express로 서버 생성. http.createServer()메소드는 생성한 서버객체를 리턴
const fs = require('fs'); // node.js의 기본 내장 모듈 (file system)

app.use(express.static('src')); // use 메소드를 사용하여 정적파일 설정하기. 파라미터에는 express.static 미들웨어 함수를 사용하여 경로를 설정하여 전달.

app.get('/', function(req, res){ //get(url로 접근) '/'는 localhost 8080
    fs.readFile('./src/index.html', (err, data) => {//readfile()은 파일 전체를 비동기로 읽어옴. 콜백함수의 인자(err, data)
        if(err) throw err;// err은 에러 시 전달되는 값
                          // data는 파일 내용이 읽어졌을 경우 전달되는 값
        res.writeHead(200, { // 정상적인 응답이 있을 경우. wirteHead()는 웅답 스트림에 헤더와 상태 코드를 작성하는 것
            'Content-Type' : 'text/html'
        })
        .write(data) // 응답 바디 작성
        .end();// wite 후에 요청 전소 종료
    });
});


server.listen(8080,function(){ // listen 메소드를 이용하여 port 설정
    console.log('server running..');
});
