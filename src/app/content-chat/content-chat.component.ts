import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-content-chat',
  templateUrl: './content-chat.component.html',
  styleUrls: ['./content-chat.component.scss']
})
export class ContentChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  avatarUrl='../../../../assets/shiba1.jpg'
  userName='User Name'
  lastTimeConnect='Truy cập 1 giờ trước'
  message = new FormControl('');

}
