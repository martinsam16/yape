import {Component, OnInit} from '@angular/core';
import {ContractService} from "../../services/contract/contract.service";
import AccountModel from "../../model/AccountModel";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    private account: AccountModel;

    address: string;
    balance: number;

    constructor(private contract: ContractService) {
        this.contract.connectAccount()
            .then(async web3js => {
                const accounts = await web3js.eth.getAccounts();
                const initialvalue = await web3js.eth.getBalance(accounts[0]);
                this.account = {
                    address: accounts[0],
                    balance: Number(web3js.utils.fromWei(initialvalue, 'ether'))
                }
                this.address = this.account.address;
                this.balance = this.account.balance
            })
            .then(this.contract.setDefaultEvents);

    }

    ngOnInit(): void {
    }

}
