import { NotifyService } from './../service/notify.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ContactService } from './../service/contact.service';
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';
import { FriendsService } from './../shared/data/friends.service';

export interface obj {
  idYeuCauKetBan: string;
  idDongYKetBan: string;
}

@Component({
  selector: 'app-dialog-add-friend',
  templateUrl: './dialog-add-friend.component.html',
  styleUrls: ['./dialog-add-friend.component.scss'],
})
export class DialogAddFriendComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DialogAddFriendComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contactServiec: ContactService,
    private storageService: StorageService
  ) {}

  obj: obj = {
    idYeuCauKetBan: this.data.dataUser.userid,
    idDongYKetBan: this.storageService.get('userId'),
  };
  ngOnInit(): void {}

  async accept() {
    let res = await this.contactServiec.acceptFriend(this.obj);
    this.dialogRef.close('Đã là bạn bè');
  }
  async deny() {
    let res = await this.contactServiec.denyFriend(this.obj);
    this.dialogRef.close('Đã từ chối lời mời kết bạn');
  }
}
