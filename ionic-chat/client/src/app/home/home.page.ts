import { Component } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username : string; 

  constructor() {}
  login(){
    axios.post('http://localhost:3030/login', {
        username : this.username
    })
    .then(res=>{
        if(res.data == 'fail!'){
            alert("인증 실패!");
            return;
        }
        sessionStorage.setItem("id", this.username);
        location.href ="/chat";
    })
    .catch(error=>{
        console.log(error);
    })
  }
}
