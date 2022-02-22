import Web3 from "web3";

let provider;
if (typeof window !== "undefined" && window.ethereum) {
  window.ethereum.request({ method: "eth_requestAccounts" });
  provider = window.ethereum;
} else {
  provider = new Web3.providers.HttpProvider(
    `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`
  );
}
const web3 = new Web3(provider);

export default web3;
