import { DataChatService } from './../shared/data/data-chat.service';
import { ChatService } from './../service/chat.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-content-chat',
  templateUrl: './content-chat.component.html',
  styleUrls: ['./content-chat.component.scss'],
})
export class ContentChatComponent implements OnInit {
  constructor(
    private chatService: ChatService,
    private dataChatService: DataChatService
  ) {}

  avatarUrl = './../../../assets/zalo.png';
  userName = 'ZALO';
  lastTimeConnect = 'Truy cập 1 giờ trước';
  cuurentUser = {};
  ngOnInit(): void {
    this.dataChatService.currentUser.subscribe((user) => {
      console.log(user);
      this.userName = user.infoUser.username;
      this.avatarUrl = user.infoUser.imgurl;
    });
  }

  message = new FormControl('');
}
