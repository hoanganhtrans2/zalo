import { ChatModel } from './../shared/model/chat.model';
import { DbLocalService } from './../shared/data/db.service';
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
    private notifyService: NotifyService,
    private dbLocal: DbLocalService
  ) {}

  listRoomChat = [];
  listConversition = [];
  lastMessage = 'hello';
  selectedOptions: any;
  selectedValue = 1;
  ngOnInit(): void {
    this.dataChatService.currentListItemChat.subscribe((list) => {
      this.listRoomChat = list;
    });
  }
  async getListItemChat(): Promise<any> {
    const id = this.storageService.get('userId');
  }
  changeSelected() {
    this.dataChatService.changeIsShow(true);
    if (this.selectedOptions[0]) {
      let roomid = this.selectedOptions[0].infoRoom.roomid;
      this.selectedOptions[0].listmessage = this.dbLocal.getAllMessageFromRoom(
        roomid
      );
      this.chatService
        .getMessageFromRoom({
          roomid: roomid,
          type: 'chat',
        })
        .then((value) => {
          this.dbLocal.RoomObject[roomid].setListConversitions(value['Items']);
          this.dbLocal.changeListMessage(value['Items']);
        });

      this.dataChatService.changSelectUser(this.selectedOptions[0]);
    }
  }
}
