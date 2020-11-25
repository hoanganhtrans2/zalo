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

  async ngOnInit(): Promise<void> {
    console.log(CurrentDate.getCurrentDate());
    const resultF = await this.contactServiec.getListFriends({
      id: this.userId,
    });
    const resultI = await this.contactServiec.getListInvitations({
      id: this.userId,
    });

    this.storageService.isUpdata.subscribe(() => {
      this.userName = this.storageService.get('userName');
    });

    this.invitationsService.currentNumber.subscribe(
      (value) => (this.notifyInvitations = value)
    );

    this.notifyService.connectNotify(this.userId);

    this.notifyService.listenNotify().subscribe((date) => {
      this.invitationsService.changeList([]);
      this.openNotifyPanel(date);
      console.log(date);
    });

    this.friendsService.setNotify(resultF.Count);
    this.invitationsService.setNotify(resultI.Count);

    this.notifyFriend = this.friendsService.getNotify();
    this.notifyInvitations = this.invitationsService.getNotify();

    this.friendsService.setList(resultF.Items);
    this.invitationsService.setList(resultI.Items);
  }

  async preLoadInvitation() {
    const resultI = await this.contactServiec.getListInvitations({
      id: this.userId,
    });
    this.invitationsService.changeList(resultI.Items);
  }

  goToChat() {
    this.currentComponent = 'chat';
  }
  goToContact() {
    this.currentComponent = 'contact';
  }
  goToAddFriend() {
    this.currentComponent = 'invitations';
  }

  async getCurrentUserInfo() {
    let res = await this.userService.getUserInfo(this.userId);
    if (res) {
      this.dataUser = res.Item;
    }
  }

  openNotifyPanel(data) {
    // console.log('nhaanj');
    // let data = {
    //   username: 'honag anh',
    //   imgurl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    // };
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
