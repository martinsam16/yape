import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
    address: string;
}

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DonateComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    ) {}

    closeDialog(): void {
        this.dialogRef.close();
    }


  ngOnInit(): void {
  }

}
