import {Component, OnInit} from '@angular/core';
import {ContractService} from "../../services/contract/contract.service";
import AccountModel from "../../model/AccountModel";
import {QrComponent} from "../qr/qr.component";
import {MatDialog} from "@angular/material/dialog";
import {TransactionComponent} from "../transaction/transaction.component";
import {YapeService} from "../../services/yape/yape.service";
import YapeHistory from "../../model/YapeHistory";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    private account: AccountModel;

    address: string;
    profileImage:string;
    balance: number;
    showBalance: boolean;
    misYapeos: YapeHistory[];

    constructor(private contract: ContractService,
                private yapeService: YapeService,
                public dialog: MatDialog) {
        this.contract.connectAccount()
            .then(async web3js => {
                const accounts = await web3js.eth.getAccounts();
                const initialvalue = await web3js.eth.getBalance(accounts[0]);
                this.account = {
                    address: accounts[0],
                    balance: Number(web3js.utils.fromWei(initialvalue, 'ether'))
                }
                this.address = this.account.address;
                this.balance = Math.round(this.account.balance * 100) / 100;
                this.profileImage = 'https://avatars.dicebear.com/api/avataaars/'+this.address+'.svg?size=40';
            })
            .then(this.contract.setDefaultEvents);

    }

    openQrDialog(): void {
        const dialogRef = this.dialog.open(QrComponent, {
            data: {
                urlQr: 'https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=' + this.address + '&choe=UTF-8',
                address: this.address,
                name: 'Martín Alexis Samán Arata'
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    openTransactionDialog(): void {
        const dialogRef = this.dialog.open(TransactionComponent, {
            data: {
                senderAddress: this.address
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('Dialogo cerrado, deberias actualizar los estados e.e');
        });
    }

    ngOnInit(): void {
    }

    alternateShowBalance(): void {
        this.showBalance = !this.showBalance;
    }

    verYapeos(): void {
        this.yapeService._verYapeos(this.account.address).then((yapeos) => {
            this.misYapeos = yapeos;
        });
    }

}
