import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from "ngx-socket-io";
import { IonContent, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {
  @ViewChild(IonContent, { read: IonContent, static: true }) content: IonContent;

  message = '';
  messages = [];
  user = '';

  constructor(private socket: Socket, private toastCtrl: ToastController) {

  }

  ngOnInit() {

    this.socket.connect();

    var name = sessionStorage.getItem("id");
    this.user = name;

    this.socket.emit('newUserConnect', name);

    this.socket.fromEvent('updateMessage').subscribe(data => {
      this.messages.push(data);
      this.content.scrollToBottom();

    });

  }

  sendMessage() {
    if (!this.message) return false;
    this.socket.emit('sendMessage', { message: this.message });
    this.message = '';
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

}
