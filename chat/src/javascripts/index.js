// var socket = io();
const input = document.querySelector('#username');


function login()
{
    var username = input.value;

  axios({
    method: 'post', //통신 방식
    url: 'http://localhost:8080/', //통신할 페이지
    data: {
        "name": username
    } //인자로 보낼 데이터
  })
    .then(response=>{
        // movePage();
        console.log(response);
    })
    .catch(error=>{
        console.log(error);
    })
}


// function movePage() {
//     location.href = "/chat";
// }















// function login() {
//     if (input.value.length != 0) {
//         // if (같은 이름 없으면 ){
//         movePage();
//         // }else{
//         //     alert("사용 중인 이름입니다. 다시 입력해주세요.");
//         // }
//         return input.value;
//     }
// }
