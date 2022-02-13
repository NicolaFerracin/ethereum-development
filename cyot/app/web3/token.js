import web3 from "./web3";
import token from "../../ethereum/artifacts/contracts/Token.sol/Token.json";

const getTokenInstance = (address) =>
  new web3.eth.Contract(token.abi, address);

export default getTokenInstance;
