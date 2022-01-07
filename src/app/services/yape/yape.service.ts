import {Inject, Injectable} from '@angular/core';

import {WEB3} from "../../core/web3";
import Web3 from 'web3';
import {web3Modal} from "../../core/web3modal";
import YapeHistory from "../../model/YapeHistory";

declare let require: any;
declare let window: any;

var contract = require("@truffle/contract");
const abiPayment = require('../../abi/Yape.json');

@Injectable({
    providedIn: 'root'
})
export class YapeService {
    provider;

    constructor(@Inject(WEB3) private web3: Web3) {
    }

    async _yapear(originAccount, destinyAccount, amount, comment) {
        const that = this;
        this.provider = await web3Modal.connect();
        return new Promise((resolve, reject) => {
            const yapeContract = contract(abiPayment);
            yapeContract.setProvider(this.provider);
            yapeContract.deployed().then((instance) => {
                let finalAmount = this.web3.utils.toBN(amount)
                console.log(finalAmount)
                return instance.yapear(
                    destinyAccount,
                    comment,
                    new Date().toLocaleString(),
                    {
                        from: originAccount,
                        value: this.web3.utils.toWei(finalAmount, 'ether')
                    }
                ).then(() => {
                    console.log('Yapeo exitoso :D');
                    return resolve({status: true});
                }).catch((reason => {
                    console.log('Yapeo fallido D:', reason);
                    return reject(reason);
                }));
            })
        });
    }

    async _verYapeos(account): Promise<YapeHistory[]> {
        const that = this;
        this.provider = await web3Modal.connect();
        return new Promise((resolve, reject) => {
            const yapeContract = contract(abiPayment);
            yapeContract.setProvider(this.provider);
            yapeContract.deployed().then((instance) => {
                return instance.verYapeos({from: account})
                    .then((yapeos) => {
                        return resolve(yapeos.map((yape) => {
                            return <YapeHistory>{
                                receiver: yape.receiver,
                                amount: Number(this.web3.utils.fromWei(yape.amount, 'ether')),
                                action: yape.action,
                                comment: yape.comment,
                                date: yape.date,
                                img: 'https://avatars.dicebear.com/api/avataaars/'+yape.receiver+'.svg'
                            };
                        }));
                    }).catch((reason => {
                        console.log('Error al obtener yapeos D:', reason);
                        return reject(reason);
                    }));
            })
        });
    }
}
