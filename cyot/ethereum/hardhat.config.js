require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

function mnemonic() {
  if (!process.env.MNEMONIC && defaultNetwork !== "localhost") {
    console.error("☢️ WARNING: No mnemonic defined in the .env file.");
  }
  if (!process.env.INFURA_PROJECT_ID && defaultNetwork !== "localhost") {
    console.error("☢️ WARNING: No Infura project ID defined in the .env file.");
  }
  return process.env.MNEMONIC;
}

module.exports = {
  defaultNetwork: "ropsten",
  solidity: "0.8.6",
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
  },
};
