import {Inject, Injectable} from '@angular/core';

import {WEB3} from "../../core/web3";
import Web3 from 'web3';
import {web3Modal} from "../../core/web3modal";
import YapeHistory from "../../model/YapeHistory";

declare let require: any;
declare let window: any;

var contract = require("@truffle/contract");
const yapeAbi = require('../../abi/Yape.json');

@Injectable({
    providedIn: 'root'
})
export class YapeService {
    private provider;
    private yapeContract;

    constructor(@Inject(WEB3) private web3: Web3) {
        this.yapeContract = contract(yapeAbi);
    }

    async _getContractAddress(): Promise<any> {
        this.provider = await web3Modal.connect();
        return new Promise(((resolve, reject) => {
            this.yapeContract.setProvider(this.provider);
            return this.yapeContract.deployed().then((instance) => {
                return resolve(instance.address);
            }).catch((reason => reject(reason)));
        }));
    }

    async _yapear(originAccount, destinyAccount, amount, comment): Promise<any> {
        this.provider = await web3Modal.connect();
        return new Promise((resolve, reject) => {
            this.yapeContract.setProvider(this.provider);
            this.yapeContract.deployed().then((instance) => {
                return instance.yapear(
                    destinyAccount,
                    comment,
                    new Date().toLocaleString(),
                    {
                        from: originAccount,
                        value: amount * 1e18
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
        this.provider = await web3Modal.connect();
        return new Promise((resolve, reject) => {
            this.yapeContract.setProvider(this.provider);
            this.yapeContract.deployed().then((instance) => {
                return instance.verYapeos({from: account})
                    .then((yapeos) => {
                        return resolve(yapeos.map((yape) => {
                            return <YapeHistory>{
                                receiver: yape.receiver,
                                amount: Number(this.web3.utils.fromWei(yape.amount, 'ether')),
                                action: yape.action,
                                comment: yape.comment,
                                date: yape.date,
                                img: 'https://avatars.dicebear.com/api/avataaars/' + yape.receiver + '.svg'
                            };
                        }).sort( (a, b)=> +new Date(b.date) - +new Date(a.date)));
                    }).catch((reason => {
                        console.log('Error al obtener yapeos D:', reason);
                        return reject(reason);
                    }));
            })
        });
    }

    async _getOwner(): Promise<any> {
        this.provider = await web3Modal.connect();
        return new Promise(((resolve, reject) => {
            this.yapeContract.setProvider(this.provider);
            this.yapeContract.deployed().then((instance) => {
                return instance.getOwner()
                    .then((address) => resolve(address))
                    .catch((reason => reject(reason)));
            });
        }));
    }

    async _verDonaciones(account): Promise<any> {
        this.provider = await web3Modal.connect();
        return new Promise(((resolve, reject) => {
            this.yapeContract.setProvider(this.provider);
            this.yapeContract.deployed().then((instance) => {
                return instance.verDonaciones({from: account})
                    .then((donaciones) => resolve(donaciones/1e18))
                    .catch((reason => reject(reason)));
            });
        }));
    }
}
