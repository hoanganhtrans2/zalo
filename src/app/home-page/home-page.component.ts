import { DataChatService } from './../shared/data/data-chat.service';
import { ChatService } from './../service/chat.service';
import { CurrentDate } from './../shared/helper/CurrentDate.Helper';
import { NotifyPanelComponent } from './../notify-panel/notify-panel.component';
import { DataInvitationsService } from './../shared/data/data-invitations.service';
import { DataFriendsService } from './../shared/data/data-friends.service';
import { DialogFindfriendComponent } from './../dialog-findfriend/dialog-findfriend.component';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateComponent } from '../dialog-update/dialog-update.component';
import { StorageService } from '../service/storage.service';
import { GetUserService } from '../service/get-user.service';
import { ContactService } from './../service/contact.service';
import { NotifyService } from './../service/notify.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public matSnackBar: MatSnackBar,
    private storageService: StorageService,
    private userService: GetUserService,
    private chatService: ChatService,
    private dataChatService: DataChatService,
    private contactServiec: ContactService,
    private dataFriendsService: DataFriendsService,
    private dataInvitationsService: DataInvitationsService,
    private notifyService: NotifyService
  ) {}
  userName = this.storageService.get('userName');
  userId = this.storageService.get('userId');
  dataUser: any;
  avatarUrl = '../../assets/shiba1.jpg';
  notifyChat: number;
  notifyFriend: number;
  notifyInvitations: number;
  currentComponent = 'chat';
  isShowContentChat = false;

  async ngOnInit(): Promise<void> {
    Promise.all([
      this.contactServiec
        .getListFriends({
          id: this.userId,
        })
        .then((value) => {
          this.dataFriendsService.changeList(value['Items']);
        }),
      this.contactServiec
        .getListInvitations({
          id: this.userId,
        })
        .then((value) => {
          this.dataInvitationsService.changeList(value['Items']);
          this.dataInvitationsService.changeNumber(value['Count']);
        }),
      this.chatService
        .getListRoom({
          id: this.userId,
        })
        .then((room) => {
          this.dataChatService.changeList(room);
          room.forEach((element) => {
            this.notifyService.joinRom(element.infoRoom.roomid);
          });
        }),
    ]).catch((reason) => {
      console.log(reason);
    });

    this.dataInvitationsService.currentNumber.subscribe((data) => {
      this.notifyInvitations = data;
    });

    this.storageService.isUpdata.subscribe(() => {
      this.userName = this.storageService.get('userName');
    });

    this.notifyService.connectNotify(this.userId);

    this.notifyService.listenNotify().subscribe((data) => {
      this.preLoadInvitation();
      this.openNotifyPanel(data);
    });
    this.notifyService.listenAccept().subscribe((data) => {
      this.preLoadInvitation();
      this.openNotifyPanel(data);
    });

    this.notifyService.listenDelete().subscribe(() => {
      this.preLoadContact();
    });
  }

  async preLoadContact() {
    const resultI = await this.contactServiec.getListFriends({
      id: this.userId,
    });
    this.dataFriendsService.changeList(resultI.Items);
    this.dataFriendsService.setList(resultI.Items);
  }
  async preLoadInvitation() {
    const resultI = await this.contactServiec.getListInvitations({
      id: this.userId,
    });
    this.dataInvitationsService.changeNumber(resultI.Count);
    this.dataInvitationsService.changeList(resultI.Items);
    this.dataInvitationsService.setList(resultI.Items);
  }

  goToChat() {
    this.currentComponent = 'chat';
    this.isShowContentChat = true;
  }
  goToContact() {
    this.currentComponent = 'contact';
    this.isShowContentChat = false;
  }
  goToAddFriend() {
    this.currentComponent = 'invitations';
    this.isShowContentChat = false;
  }

  async getCurrentUserInfo() {
    let res = await this.userService.getUserInfo(this.userId);
    if (res) {
      this.dataUser = res.Item;
    }
  }

  openNotifyPanel(data) {
    this.matSnackBar.openFromComponent(NotifyPanelComponent, {
      data: data,
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['notify'],
    });
  }

  async openDialog() {
    await this.getCurrentUserInfo();
    const dialogRef = this.dialog.open(DialogUpdateComponent, {
      width: '450px',
      data: { dataUser: this.dataUser },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  openFindFriendDialog() {
    const dialogFindFriend = this.dialog.open(DialogFindfriendComponent, {
      width: '350px',
    });
  }

  logOut() {
    this.storageService.removeAll();
    this.router.navigate(['./login']);
  }
}
