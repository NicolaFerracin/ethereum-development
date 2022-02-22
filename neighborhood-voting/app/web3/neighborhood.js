import web3 from "./web3";
import neighborhood from "../contracts/Neighborhood.sol/Neighborhood.json";

const getNeighborhoodInstance = (address) =>
  new web3.eth.Contract(neighborhood.abi, address);

export default getNeighborhoodInstance;
