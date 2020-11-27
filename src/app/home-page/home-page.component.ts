import { CurrentDate } from './../shared/helper/CurrentDate.Helper';
import { NotifyPanelComponent } from './../notify-panel/notify-panel.component';
import { InvitationsService } from './../shared/data/invitations.service';
import { FriendsService } from './../shared/data/friends.service';
import { DialogFindfriendComponent } from './../dialog-findfriend/dialog-findfriend.component';
import { from } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
    private contactServiec: ContactService,
    private friendsService: FriendsService,
    private invitationsService: InvitationsService,
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
    console.log(CurrentDate.getCurrentDate());
    const resultF = await this.contactServiec.getListFriends({
      id: this.userId,
    });
    const resultI = await this.contactServiec.getListInvitations({
      id: this.userId,
    });

    this.friendsService.changeList(resultF.Items);

    this.invitationsService.changeList(resultI.Items);

    this.invitationsService.changeNumber(resultI.Count);

    this.invitationsService.currentNumber.subscribe((data) => {
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
    this.friendsService.setList(resultF.Items);
    this.invitationsService.setList(resultI.Items);
  }

  async preLoadContact() {
    const resultI = await this.contactServiec.getListFriends({
      id: this.userId,
    });
    this.friendsService.changeList(resultI.Items);
    this.friendsService.setList(resultI.Items);
  }
  async preLoadInvitation() {
    const resultI = await this.contactServiec.getListInvitations({
      id: this.userId,
    });
    this.invitationsService.changeNumber(resultI.Count);
    this.invitationsService.changeList(resultI.Items);
    this.invitationsService.setList(resultI.Items);
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
