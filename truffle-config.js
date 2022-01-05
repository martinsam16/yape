// http://18.230.79.100:8080/?operacion=getAccount

const HDWalletProvider = require('@truffle/hdwallet-provider');

// TODO Modify with valid address
const privateKeys = [
  "0x000000000000000000000000000000000000000",
];

module.exports = {
  contracts_build_directory: './src/app/abi/',
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    lacchain: {
      provider: () => {
        return new HDWalletProvider(privateKeys, "https://writer.lacchain.net/")
      },
      port: 4545,
      gas: 9003605,
      gasPrice: 0x0,
      network_id: "*",
    },
    lacchainValleGrande: {
      provider: () => {
        return new HDWalletProvider(privateKeys, "http://34.86.137.246:4545")
      },
      port: 4545,
      gas: 9003605,
      gasPrice: 0x0,
      network_id: "*",
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider("mnemonic", "YOUR_RINKEBY_TEST_URL"),
      network_id: "4",
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: '0.8.11',
    }
  }
};
