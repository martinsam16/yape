import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators,} from "@angular/forms";
import {PaymentService} from "../../services/payment/payment.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
    senderAddress: string;
}

@Component({
    selector: "app-transaction",
    templateUrl: "./transaction.component.html",
    styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent implements OnInit {
    receiveAddress: string;
    amount: number;
    senderAddress: string;
    transactionForm: FormGroup;

    constructor(private fb: FormBuilder,
                private payment: PaymentService,
                public dialogRef: MatDialogRef<TransactionComponent>,
                @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,) {
        this.transactionForm = new FormGroup({
            sendaddress: new FormControl("", [Validators.required]),
            amount: new FormControl("", [Validators.required]),
        });
    }

    ngOnInit(): void {
        this.transactionForm.valueChanges.subscribe((x) => {
        });
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    sendEth(e) {
        this.receiveAddress = this.transactionForm.value.sendaddress;
        this.amount = this.transactionForm.value.amount;

        this.payment
            .yapear(this.dialogData.senderAddress, this.receiveAddress, this.amount)
            .then((r) => {
                console.log(r);
                this.closeDialog();
            })
            .catch((e) => {
                alert('Error yapeando');
            });
    }
}
