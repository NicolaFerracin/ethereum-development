import web3 from "./web3";
import tokenFactory from "../contracts/TokenFactory.sol/TokenFactory.json";

const instance = new web3.eth.Contract(
  tokenFactory.abi,
  "0x0B379AA12ff6278317050649E2A5900C75bcfB57"
);

export default instance;
