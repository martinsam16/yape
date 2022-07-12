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
    addressContractDonate: string;
    profileImage: string;
    balance: number;
    showBalance: boolean;
    misYapeos: YapeHistory[] = [];
    donaciones: number;
    isOwner: boolean;

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
                this.profileImage = 'https://avatars.dicebear.com/api/avataaars/' + this.address + '.svg?size=40';
                this.verYapeos();
            })
            .then(this.contract.setDefaultEvents);

        this.yapeService._getContractAddress().then((address) => {
            this.addressContractDonate = address;
        })

        this.yapeService._getOwner().then((address) => {
            this.isOwner = address == this.address;
            console.log('Soy owner ', this.isOwner);
        })
    }

    openQrDialog(): void {
        const dialogRef = this.dialog.open(QrComponent, {
            data: {
                urlQr: 'https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=' + this.address + '&choe=UTF-8',
                address: this.address,
                name: this.address
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    openYapearDialog(): void {
        const dialogRef = this.dialog.open(TransactionComponent, {
            data: {
                from: this.address,
                fromMovement: false
            }
        });

        dialogRef.afterClosed().subscribe(() => {
            this.verYapeos();
        });
    }

    openYapearDialogFromMovement(address: string): void {
        const dialogRef = this.dialog.open(TransactionComponent, {
            data: {
                from: this.address,
                to: address,
                fromMovement: true
            }
        });

        dialogRef.afterClosed().subscribe(() => {
            this.verYapeos();
        });
    }

    donarDialog(): void {
        const dialogRef = this.dialog.open(QrComponent, {
            data: {
                address: this.addressContractDonate,
                name: 'Transfiere a esta dirección: ' + this.addressContractDonate,
                urlQr: 'https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=' + this.addressContractDonate + '&choe=UTF-8',
            }
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

    verDonaciones(): void {
        this.yapeService._verDonaciones(this.address).then((value => this.donaciones = value));
    }


}
