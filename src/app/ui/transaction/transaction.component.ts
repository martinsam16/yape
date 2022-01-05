import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators,} from "@angular/forms";
import {ContractService} from "src/app/services/contract/contract.service";
import {PaymentService} from "../../services/payment/payment.service";

@Component({
    selector: "app-transaction",
    templateUrl: "./transaction.component.html",
    styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent implements OnInit {
    address: string;
    amount: number;
    direction: any;
    transactionForm: FormGroup;

    constructor(private fb: FormBuilder, private contract: ContractService, private payment: PaymentService) {
        this.transactionForm = new FormGroup({
            sendaddress: new FormControl("", [Validators.required]),
            amount: new FormControl("", [Validators.required]),
        });

        contract
            .connectAccount()
            .then(async (web3js) => {
                const accounts = await web3js.eth.getAccounts();
                this.direction = accounts[0];
                console.log('direction:', this.direction)
            })
            .then(this.contract.setDefaultEvents)
            .catch((error: any) => {
                console.log(error);
            });
    }

    ngOnInit(): void {
        this.transactionForm.valueChanges.subscribe((x) => {
        });
    }

    sendEth(e) {
        this.address = this.transactionForm.value.sendaddress;
        this.amount = this.transactionForm.value.amount;

        this.payment
            .trasnferEther(this.direction, this.address, this.amount)
            .then((r) => {
                console.log(r);
            })
            .catch((e) => {
                console.log(e);
            });
    }
}
