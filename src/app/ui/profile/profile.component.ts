import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AliasComponent} from "../alias/alias.component";
import {YapeService} from "../../services/yape/yape.service";

export interface DialogData {
  address: string;
  profileImage: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  showQr: boolean = false;
  aliasUser: string;

  constructor(public dialogRef: MatDialogRef<ProfileComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
              public dialog: MatDialog,
              private yapeService: YapeService,) { }

  ngOnInit(): void {
    this.getMyAlias();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  toggleQr(): void{
    this.showQr = !this.showQr;
  }

  openUserEditDialog(): void {
    const dialogRef =  this.dialog.open(AliasComponent, {
      data: {
        from: this.dialogData.address,
        alias: this.aliasUser,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getMyAlias();
    });
  }

  getMyAlias() {
    this.yapeService._viewAlias(this.dialogData.address).then(value => {
          this.aliasUser = value;
        }
    );
  }

}
