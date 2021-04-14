const express = require('express');
const cors = require('cors');
const app = express();

const http = require('http');
const port = 3030;

const authUserlist = [
    {
        username: '준경'
    },
    {
        username: '지형'
    },
    {
        username: '슬기'
    },
]

// const corsOptions = {
//     origin: "file:///Users/kimjunkyung/Desktop/chat/client/"
// }

// app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.send('hi server');
});

app.post('/login', function (req, res) {
    let username = req.body.name;
    if (username != authUserlist[0].username && username != authUserlist[1].username && username != authUserlist[2].username) {
        res.send('fail!');
        return;
    }
    res.send('login success!');

    console.log(username);
});

let server = http.createServer(app);

app.io = require('socket.io')();
app.io.attach(server);
var socketList = [];

//connection 이라는 이벤트가 들어왔을 때, 그 다음 요소로 오는 콜백 함수 호출.
//socket이라는 파라미터는 connection이 성공했을 때 connection에 대한 정보를 담고 있는 변수 -> 이 socket을 사용하여 서버에서 event listener를 만들면 됨.
app.io.sockets.on('connection', (socket) => {
    console.log('socket connect !');
    socketList.push(socket);

    socket.on('newUserConnect', function (name) {
        if (name != null) {
            socket.name = name;

            var message = name + '님이 접속했습니다.';

            app.io.sockets.emit('updateMessage', {
                name: 'SERVER',
                message: message
            });
        }

    });
    //socket 통신이 끊겼을 때(disconnect이라는 이벤트가 들어왔을 때) 실행됨.
    socket.on('disconnect', () => {
        console.log('socket disconnect !');
        socketList.splice(socketList.indexOf(socket), 1);
        var message = socket.name + '님이 퇴장했습니다.';
        if (socket.name != null) {
            socket.broadcast.emit('updateMessage', {
                name: 'SERVER',
                message: message
            });
        }
    });

    //socket.on(eventName, callback)
    //eventName(String), callback(function), Return Socket
    socket.on('sendMessage', function (data) { //이벤트 명 'chat-msg'
        //emit() 메소드를 통해 같은 포트를 사용하고 있는 곳으로 msg라는 메세지를 출력
        //이벤트는 emit('event')로 전달하면 on('event')로 받는다.
        data.name = socket.name;
        app.io.sockets.emit('updateMessage', data);

    });

    // socket.on('updateMessage', function(data){
    //   console.log(data);
    //       socketList.forEach(function(item, i) {
    //           console.log(item.id);
    //           if (item != socket) {
    //               item.emit('updateMessage', data.message);
    //           }
    //       });
    // })
});



server.listen(port);
server.on('listening', () => {
    console.log(`server listening on port: ${port}`)
})

server.on('error', () => {

})