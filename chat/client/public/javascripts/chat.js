var socket = io('http://localhost:3030/');
var sendButton = document.getElementById("send");
var msg = document.getElementById('msg');
var chattingSpace = document.getElementById('chatting-space');


socket.on('connect', function () {
    var name = sessionStorage.getItem("id");
    socket.emit('newUserConnect', name);
});


socket.on('updateMessage', function (data) {
    if (data.name == 'SERVER') {
        var entryMessage = enterance(data);
        chattingSpace.appendChild(entryMessage);
    }
    else {
        if(sessionStorage.getItem("id") == data.name){
            var chatMessage = drawMyChatMessage(data);
            chattingSpace.appendChild(chatMessage);
        }else{
            var chatMessage = drawChatMessage(data);
            chattingSpace.appendChild(chatMessage);
        }
    }
    chattingSpace.scrollTop = chattingSpace.scrollHeight;
})

function enterance(data) {
    var wrap = document.createElement('div');
    var entryMessage = document.createElement('div');

    entryMessage.innerText = data.message;
    wrap.classList.add('entrance');
    wrap.classList.add('entrance-wrap');
    wrap.dataset.id = socket.id;

    wrap.appendChild(entryMessage);

    return wrap;
}

function drawMyChatMessage(data) {
    var wrap = document.createElement('div');
    var message = document.createElement('div');
    var name = document.createElement('div');

    name.innerText = data.name;
    message.innerText = data.message;

    name.classList.add('username');
    message.classList.add('message');
    wrap.classList.add('my-message-wrap');
    wrap.dataset.id = socket.id;

    wrap.appendChild(name);
    wrap.appendChild(message);

    return wrap;
}

function drawChatMessage(data) {
    var wrap = document.createElement('div');
    var message = document.createElement('div');
    var name = document.createElement('div');

    name.innerText = data.name;
    message.innerText = data.message;

    name.classList.add('username');
    message.classList.add('message');
    wrap.classList.add('message-wrap');
    wrap.dataset.id = socket.id;

    wrap.appendChild(name);
    wrap.appendChild(message);

    return wrap;
}




sendButton.addEventListener('click', function () {
    var message = msg.value;

    if (!message) return false;

    socket.emit('sendMessage', {
        message
    });

    msg.value = '';
})

