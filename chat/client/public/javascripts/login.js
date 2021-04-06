const input = document.querySelector('#username');

function login()
{
    var username = input.value;

    axios.post('http://localhost:3030/login', {
        name: username
    })
    .then(res=>{
        if(res.data == 'fail!'){
            alert("인증 실패!");
            return;
        }
        sessionStorage.setItem("id", username);
        movePage();
    })
    .catch(error=>{
        console.log(error);
    })

}

function movePage() {
    location.href = "/chat";
}
