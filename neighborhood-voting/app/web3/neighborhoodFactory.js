import web3 from "./web3";
import neighborhoodFactory from "../contracts/NeighborhoodFactory.sol/NeighborhoodFactory.json";

const instance = new web3.eth.Contract(
  neighborhoodFactory.abi,
  "0xa759cD05ce43dA7A6c2474ba42a2649Ad8178340"
);

export default instance;
