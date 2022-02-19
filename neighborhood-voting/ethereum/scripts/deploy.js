// https://hardhat.org/guides/deploying.html
const { ethers } = require("hardhat");

async function main() {
  const NeighborhoodFactory = await ethers.getContractFactory(
    "NeighborhoodFactory"
  );
  const neighborhoodFactory = await NeighborhoodFactory.deploy();

  console.log("NeighborhoodFactory deployed to:", neighborhoodFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
