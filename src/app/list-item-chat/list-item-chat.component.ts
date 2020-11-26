import { FriendsService } from './../shared/data/friends.service';
import { ContactService } from './../service/contact.service';
import { StorageService } from './../service/storage.service';
import { ChatService } from './../service/chat.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-list-item-chat',
  templateUrl: './list-item-chat.component.html',
  styleUrls: ['./list-item-chat.component.scss'],
})
export class ListItemChatComponent implements OnInit {
  constructor(
    private chatService: ChatService,
    private storageService: StorageService,
    private friendService: FriendsService,
    private contactService: ContactService
  ) {}

  listUserChat = [];
  selectedOptions: any;
  selectedValue = 1;
  ngOnInit(): void {
    this.listUserChat = this.friendService.getList();
    this.friendService.currentListFriend.subscribe((value) => {
      this.listUserChat = value;
    });
    //
    // this.getListFriends();
  }
  async getListFriends(): Promise<any> {
    const id = this.storageService.get('userId');
    const result = await this.contactService.getListFriends({ id: id });
    this.listUserChat = result.Items;
    this.chatService.changSelect(this.listUserChat[0]);
  }
  changeSelected() {
    this.chatService.changSelect(this.selectedOptions[0]);
  }
}
