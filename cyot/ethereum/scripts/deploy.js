// https://hardhat.org/guides/deploying.html
const { ethers } = require("hardhat");

async function main() {
  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const tokenFactory = await TokenFactory.deploy();

  console.log("TokenFactory deployed to:", tokenFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
