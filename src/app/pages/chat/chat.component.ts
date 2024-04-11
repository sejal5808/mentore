import { Component } from '@angular/core';
import { ServicetestService } from '../services/servicetest.service';
import { GlobleService } from '../services/globle.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  selectedUser: any;
  messages: any[] = [];
  newMessage: string = '';
  getdata: any = [];
  delete: boolean = false;
  onlineuser: any = [];
  constructor(public socketService: ServicetestService, private gb: GlobleService) { }

  ngOnInit() {
    this.getDTa()
    this.socketService.connect(this.socketService.loginData._id);
    this.online();


    this.socketService.receiveMessages().subscribe((message: any) => {
      this.messages.push(message);
    });
  }
  online() {
    this.socketService.onlineuser().subscribe((data: any) => {
      this.onlineuser = data;
      console.log("msg", data)
    })
  }

  sendMessage() {
    if (!this.selectedUser) {
      return this.socketService.toaster("error", 'select user ');
    }

    if (this.newMessage.trim() === '') return;

    const message = {
      senderId: this.socketService.loginData._id,
      recipientId: this.selectedUser._id,
      content: this.newMessage
    };

    this.socketService.sendPrivateMessage(message);

    this.messages.push(message);
    this.newMessage = '';
  }
  selectUser(user: any) {
    this.selectedUser = user;
  }
  getDTa() {
    this.socketService.getItems('user').then((response: any) => {
      this.getdata = response.user;
    })
  }

  clickedMeDouble(index: any) {
    if (index) {
      this.delete = true;

    }

  }
  remove(index: number, message: any) {
    this.gb.swalFire().then((result: any) => {
      if (result.value) {
        const messageIndex = this.messages.findIndex(msg => msg.content === message.content);
        if (messageIndex !== -1) {
          this.messages.splice(messageIndex, 1);
        }

      }
    }
    )
  }


}
