import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item-chat',
  templateUrl: './list-item-chat.component.html',
  styleUrls: ['./list-item-chat.component.scss']
})
export class ListItemChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  selectedValue = 1 ;
  listUserChat = [
    {
      name:'user 1',
      lastMessage:'hello word',
      imgUrl:'../../../assets/shiba1.jpg'
    },
    {
      name:'user 2',
      lastMessage:'hello word word word',
      imgUrl:'../../../assets/shiba1.jpg'
    },
    {
      name:'user 3',
      lastMessage:'hello word',
      imgUrl:'../../../assets/shiba1.jpg'
    }
  ]
}
