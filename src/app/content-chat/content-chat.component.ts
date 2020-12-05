import { DbLocalService } from './../shared/data/db.service';
import { DataFriendsService } from './../shared/data/data-friends.service';
import { map } from 'rxjs/operators';
import { NotifyService } from './../service/notify.service';
import { UserId } from './../service/contact.service';
import { StorageService } from './../service/storage.service';
import { ChatModel } from './../shared/model/chat.model';
import { DataChatService } from './../shared/data/data-chat.service';
import { ChatService } from './../service/chat.service';
import {
  Component,
  OnInit,
  AfterViewChecked,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-content-chat',
  templateUrl: './content-chat.component.html',
  styleUrls: ['./content-chat.component.scss'],
})
export class ContentChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContentChat') private scrollContentChat: ElementRef;
  constructor(
    private chatService: ChatService,
    private dataChatService: DataChatService,
    private storageService: StorageService,
    private notifyService: NotifyService,
    private dataFriendsService: DataFriendsService,
    private dbLocalService: DbLocalService
  ) {}
  avatarUrl = this.storageService.get('avt');
  userid = this.storageService.get('userId');
  username = this.storageService.get('userName');
  userName = 'ZALO';
  lastTimeConnect = 'Truy cập 1 giờ trước';
  listConversation = [];
  messageChat: ChatModel;
  roomid = '';

  ngOnInit(): void {
    this.dbLocalService.currentListMessage.subscribe((value) => {
      this.listConversation = value;
    });
    this.dataChatService.currentUser.subscribe((user) => {
      if (user != 'default') {
        this.userName = user.username;
        this.avatarUrl = user.imgurl;
        this.roomid = user.infoRoom.roomid;
        this.listConversation = user.listmessage;
      }
    });
  }
  sendMessage(message: string) {
    if (message.length > 0) {
      let mess = new ChatModel(
        this.roomid,
        this.userid,
        this.username,
        this.avatarUrl,
        message
      );
      this.notifyService.sendMessage(mess);
      this.chatService.putMessage(mess).then((value) => console.log(value));
    }
  }
  scrollToBottom(): void {
    try {
      this.scrollContentChat.nativeElement.scrollTop = this.scrollContentChat.nativeElement.scrollHeight;
    } catch (err) {}
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
