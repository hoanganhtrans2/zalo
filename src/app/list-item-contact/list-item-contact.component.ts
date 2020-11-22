import { ContactService } from './../service/contact.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FriendsService } from './../shared/data/friends.service';

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
    private friendsService: FriendsService
  ) {}
  selectedOptions: any;
  listUserChat = [];
  ngOnInit(): void {
    this.listUserChat = this.friendsService.getList();
    this.getListFriends();
  }

  async getListFriends(): Promise<any> {
    const id = this.storageService.get('userId');
    const result = await this.contactServiec.getListFriends({ id: id });
    this.listUserChat = result.Items;
    this.friendsService.setNotify(result.Count);
    this.friendsService.setList(result.Items);
    console.log(this.listUserChat);
  }
  async deletefriend() {
    let model = {
      id: this.storageService.get('userId'),
      idIsDeleted: this.selectedOptions[0].userid,
    };
    let res = await this.contactServiec.deleteFriend(model);
    if (res.message) {
      let result = await this.getListFriends();
      this.snackBar.open(res.message, '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['center'],
      });
    }
  }
}
