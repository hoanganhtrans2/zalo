import { NotifyService } from './../service/notify.service';
import { InvitationsService } from './../shared/data/invitations.service';
import { ContactService } from './../service/contact.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FriendsService } from './../shared/data/friends.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
@Component({
  selector: 'app-list-item-contact',
  templateUrl: './list-item-contact.component.html',
  styleUrls: ['./list-item-contact.component.scss'],
})
export class ListItemContactComponent implements OnInit {
  constructor(
    private contactServiec: ContactService,
    private snackBar: MatSnackBar,
    private storageService: StorageService,
    private friendsService: FriendsService,
    private invitationsService: InvitationsService,
    private notifyService: NotifyService
  ) {}
  selectedOptions: any;
  listFriend = [];
  ngOnInit(): void {
    // this.listFriend = this.friendsService.getList();
    this.friendsService.currentListFriend.subscribe((data) => {
      this.listFriend = data;
    });
    this.invitationsService.currentListI.subscribe(() => {
      this.getListFriends();
    });
  }

  async getListFriends(): Promise<any> {
    const id = this.storageService.get('userId');
    const result = await this.contactServiec.getListFriends({ id: id });
    this.listFriend = result.Items;
    this.friendsService.changeList(this.listFriend);
  }
  async deletefriend() {
    let model = {
      id: this.storageService.get('userId'),
      idIsDeleted: this.selectedOptions[0].userid,
    };
    let res = await this.contactServiec.deleteFriend(model);
    if (res.message) {
      let result = await this.getListFriends();
      this.asyncdelete(model.idIsDeleted);
      this.snackBar.open('Xóa Bạn Thành Công', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['center'],
      });
    }
  }

  asyncdelete(idreceiver) {
    this.notifyService.sendDelete(idreceiver, {
      mess: 'xoas banj roif',
    });
  }
}
