import { NotifyService } from './../service/notify.service';
import { DataChatService } from './../shared/data/data-chat.service';
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
    private dataChatService: DataChatService,
    private storageService: StorageService,
    private notifyService: NotifyService
  ) {}

  listUserChat = [];
  selectedOptions: any;
  selectedValue = 1;
  ngOnInit(): void {
    this.dataChatService.currentListItemChat.subscribe((list) => {
      this.listUserChat = list;
    });
  }
  async getListItemChat(): Promise<any> {
    const id = this.storageService.get('userId');
  }
  changeSelected() {
    console.log(this.selectedOptions[0]);
    this.dataChatService.changSelect(this.selectedOptions[0]);
  }
}
