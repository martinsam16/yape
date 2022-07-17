import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TransactionComponent} from "../transaction/transaction.component";
import {isValidAddress} from "../../core/web3utils";

export interface DialogData {
    from: string;
}

@Component({
    selector: 'app-donate-scanner',
    templateUrl: './qr-scanner.component.html',
    styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements OnInit {

    public output: string;

    constructor(public dialogRef: MatDialogRef<QrScannerComponent>,
                @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
                public dialog: MatDialog
    ) {
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    isScannedQr(): boolean {
        if (this.output != null){
            if(isValidAddress(this.output)){
                this.openYapearDialogFromMovement(this.output);
                return true;
            }
            alert("Introduce un QR válido.");
        }
        return false;
    }

    ngOnInit(): void {

    }

    openYapearDialogFromMovement(address: string): void {
        this.dialog.open(TransactionComponent, {
            data: {
                from: this.dialogData.from,
                to: address,
                fromMovement: true
            }
        });
    }

    onError($event: any) {
        alert($event);
    }
}
