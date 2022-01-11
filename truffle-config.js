// http://18.230.79.100:8080/?operacion=getAccount

const HDWalletProvider = require('@truffle/hdwallet-provider');

// TODO Modify with valid address
const privateKeys = [
    "0x000000000000000000000000000000000000000",
];

const apikey = '22613749b1374d27b89ba28e13e9a5c9'
const mnemonic = 'castle announce prison unique have hair notable great census gas six swap'

module.exports = {
    contracts_build_directory: './src/app/abi/',
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*"
        },
        lacchain: {
            provider: () => new HDWalletProvider(privateKeys, "https://writer.lacchain.net/"),
            port: 4545,
            gas: 9003605,
            gasPrice: 0x0,
            network_id: "*",
        },
        lacchainValleGrande: {
            provider: () => new HDWalletProvider(privateKeys, "http://34.86.137.246:4545"),
            port: 4545,
            gas: 9003605,
            gasPrice: 0x0,
            network_id: "*",
        },
        kovan: {
            provider: () => new HDWalletProvider(mnemonic, "wss://kovan.infura.io/ws/v3/" + apikey),
            network_id: 42,
            gas: 4000000
        },
        ropsten: {
            provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${apikey}`),
            network_id: '3',
            gas: 47e5,
            gasPrice: 20e9
        },
        rinkeby: {
            provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/${apikey}`),
            network_id: '4',
            gas: 3e6,
            gasPrice: 20e9
        }
    },
    compilers: {
        solc: {
            version: '0.8.11',
        }
    }
};
