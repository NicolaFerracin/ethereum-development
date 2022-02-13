import web3 from "./web3";
import tokenFactory from "../../ethereum/artifacts/contracts/TokenFactory.sol/TokenFactory.json";

const instance = new web3.eth.Contract(
  tokenFactory.abi,
  "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
);

export default instance;
