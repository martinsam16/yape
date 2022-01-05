import {Component, OnInit} from '@angular/core';
import {ContractService} from "../../services/contract/contract.service";
import AccountModel from "../../model/AccountModel";
import {QrComponent} from "../qr/qr.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    private account: AccountModel;

    address: string;
    balance: number;
    showBalance: boolean;
    elements:string[]=['a','b','c','a','b','c','c','a','b','c']

    constructor(private contract: ContractService,
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
                this.balance = Math.round(this.account.balance*100)/100;
            })
            .then(this.contract.setDefaultEvents);

    }

    openDialog(): void {
        const dialogRef = this.dialog.open(QrComponent, {
            //width: '20vh',
            data: {
                urlQr : 'https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl='+this.address+'&choe=UTF-8',
                address: this.address,
                name: 'Martín Alexis Samán Arata'
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    ngOnInit(): void {
    }

    alternateShowBalance():void{
        this.showBalance = !this.showBalance;
    }

}
