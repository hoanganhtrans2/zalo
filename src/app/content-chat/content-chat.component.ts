import { ChatService } from './../service/chat.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-content-chat',
  templateUrl: './content-chat.component.html',
  styleUrls: ['./content-chat.component.scss'],
})
export class ContentChatComponent implements OnInit {
  constructor(private chatService: ChatService) {}

  avatarUrl = '';
  userName = '';
  lastTimeConnect = 'Truy cập 1 giờ trước';
  cuurentUser = {};
  ngOnInit(): void {
    this.chatService.currentUser.subscribe((user) => {
      console.log(user);
      this.userName = user.username;
      this.avatarUrl = user.imgurl;
    });
  }

  message = new FormControl('');
}
