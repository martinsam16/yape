import {Component, OnInit} from '@angular/core';
import {ContractService} from "../../services/contract/contract.service";
import AccountModel from "../../model/AccountModel";
import {DonateComponent} from "../donate/donate.component";
import {MatDialog} from "@angular/material/dialog";
import {TransactionComponent} from "../transaction/transaction.component";
import {YapeService} from "../../services/yape/yape.service";
import YapeHistory from "../../model/YapeHistory";
import {QrScannerComponent} from "../qr-scanner/qr-scanner.component";
import {ProfileComponent} from "../profile/profile.component";

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
    showDonations: boolean;
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

    openQrScanner(): void {
        const dialogRef = this.dialog.open(QrScannerComponent, {
            data: {
                from: this.address,
            }
        });

        dialogRef.afterClosed().subscribe(() => {
            this.verYapeos();
        });
    }

    openProfileDialog(): void {
        this.dialog.open(ProfileComponent, {
            data: {
                address: this.address,
                profileImage: this.profileImage,
            }
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

    openDonateDialog(): void {
        this.dialog.open(DonateComponent, {
            data: {
                address: this.addressContractDonate,
            }
        });
    }

    ngOnInit(): void {
    }

    alternateShowBalance(): void {
        this.showBalance = !this.showBalance;
    }

    alternateShowDonations(): void {
        this.showDonations = !this.showDonations;
        if (this.showDonations == true) {
            this.verDonaciones();
        }
    }

    verYapeos(): void {
        this.yapeService._verYapeos(this.account.address).then((yapeos) => {
            this.misYapeos = yapeos.map(yape => {
                this.yapeService._viewAlias(yape.receiver).then(value => {
                        yape.alias = value;
                    }
                );
                return yape;
            });
        });
    }

    verDonaciones(): void {
        this.yapeService._verDonaciones(this.address).then((value => this.donaciones = value));
    }


}
