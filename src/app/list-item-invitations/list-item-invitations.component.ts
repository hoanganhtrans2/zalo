import { NotifyService } from './../service/notify.service';
import { InvitationsService } from './../shared/data/invitations.service';
import { DialogAddFriendComponent } from './../dialog-add-friend/dialog-add-friend.component';
import { ContactService } from './../service/contact.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-list-item-invitations',
  templateUrl: './list-item-invitations.component.html',
  styleUrls: ['./list-item-invitations.component.scss'],
})
export class ListItemInvitationsComponent implements OnInit {
  constructor(
    private contactServiec: ContactService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private invitationsService: InvitationsService,
    private notifyService: NotifyService
  ) {}
  listinvitions = [];
  selectedOptions: any;
  id = '';
  oldNotify = 0;
  ngOnInit(): void {
    this.invitationsService.currentListI.subscribe((list) => {
      this.listinvitions = list;
    });
    //this.listinvitions = this.invitationsService.getList();
    // this.getListFriendInvitations();
  }

  async getListFriendInvitations(): Promise<any> {
    const id = this.storageService.get('userId');
    const result = await this.contactServiec.getListInvitations({ id: id });
    this.listinvitions = result.Items;
    this.invitationsService.changeNumber(result.Count);
    this.invitationsService.changeList(result.Items);
  }

  showinfo() {
    const dialogRef = this.dialog.open(DialogAddFriendComponent, {
      width: '450px',
      data: { dataUser: this.selectedOptions[0] },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result === 'true') {
          result = 'Đã là bạn bè';
          this.apceptLoimoi();
        }

        this.snackBar.open(result, '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['center'],
        });
        this.getListFriendInvitations();
      }
    });
  }
  apceptLoimoi() {
    let idreceiver = this.selectedOptions[0].userid;
    let modelNotify = {
      idsender: this.storageService.get('userId'),
      username: this.storageService.get('userName'),
      avt: this.storageService.get('avt'),
      message: 'vừa đồng ý lời mời kết bạn',
    };
    this.notifyService.sendAccept(idreceiver, modelNotify);
  }
}
