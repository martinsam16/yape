import {Inject, Injectable} from '@angular/core';

import {WEB3} from "../../core/web3";
import Web3 from 'web3';
import {web3Modal} from "../../core/web3modal";

declare let require: any;
declare let window: any;

var contract = require("@truffle/contract");
const abiPayment = require('../../abi/Payment.json');

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    provider;

    constructor(@Inject(WEB3) private web3: Web3) {
    }

    async trasnferEther(originAccount, destinyAccount, amount) {
        const that = this;
        this.provider = await web3Modal.connect();
        return new Promise((resolve, reject) => {
            const paymentContract = contract(abiPayment);
            paymentContract.setProvider(this.provider);
            paymentContract.deployed().then((instance) => {
                let finalAmount = this.web3.utils.toBN(amount)
                console.log(finalAmount)
                return instance.nuevaTransaccion(
                    destinyAccount,
                    {
                        from: originAccount,
                        value: this.web3.utils.toWei(finalAmount, 'ether')
                    }
                );
            }).then((status) => {
                if (status) {
                    return resolve({status: true});
                }
            }).catch((error) => {
                console.log(error);
                return reject('Error transfering Ether');
            });
        });
    }
}
