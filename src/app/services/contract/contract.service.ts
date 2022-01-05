import {Inject, Injectable} from '@angular/core';
import {WEB3} from '../../core/web3';
import {web3Modal} from "../../core/web3modal";


import Web3 from 'web3';
import AccountModel from "../../model/AccountModel"
import {checkAndInstantiateWeb3, whenAccountChangedReloadPage} from "../../core/web3utils";

@Injectable({
    providedIn: 'root'
})

export class ContractService {
    web3js;
    provider;
    account: AccountModel;

    constructor(@Inject(WEB3) private web3: Web3) {
        checkAndInstantiateWeb3();
    }

    async connectAccount(): Promise<Web3> {
        this.provider = await web3Modal.connect(); // set provider
        this.web3js = new Web3(this.provider); // create web3 instance
        return this.web3js;
    }

    setDefaultEvents(): void {
        whenAccountChangedReloadPage();
    }

}
