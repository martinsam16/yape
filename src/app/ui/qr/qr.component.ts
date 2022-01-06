import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
    urlQr: string;
    address:string;
    name:string;
}

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<QrComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    ) {}

    closeDialog(): void {
        this.dialogRef.close();
    }


  ngOnInit(): void {
  }

}
