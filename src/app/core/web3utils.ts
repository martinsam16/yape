import Web3 from 'web3';

export const checkAndInstantiateWeb3 = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            alert('No Ethereum browser detected. you should consider trying MetaMask');
            reject(false);
        }
        resolve(true);
    });
};

export const whenAccountChangedReloadPage = () => {
    window.ethereum.on('accountsChanged', () => {
        console.log('account changed');
        window.location.reload();
    });
};

export const whenAccountChanged = (callback: Function) => {
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
        console.log('account changed: ', accounts);
        callback();
    });
};

export const whenAccountChangedAndUseAccount = (callback: Function) => {
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
        console.log('account changed: ', accounts);
        callback(accounts);
    });
};

export const whenChainIdChanged = (callback: Function) => {
    window.ethereum.on('chainChanged', (chainId: number) => {
        console.log('chain id changed: ', chainId);
        callback();
    });
};

export const whenConnect = (callback: Function) => {
    window.ethereum.on('connect', (info) => {
        console.log('connected: ', info);
        callback();
    });
};

export const whenDisconnect = (callback: Function) => {
    window.ethereum.on('disconnect', (info) => {
        console.log('disconnect: ', info);
        callback();
    });
};