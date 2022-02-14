// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./Token.sol";

contract TokenFactory {
    address[] public tokens;

    function createToken(string memory _name, string memory _symbol, uint _initialSupply, uint8 _decimals) public {
        Token token = new Token(payable(msg.sender), _name,_symbol,_initialSupply, _decimals);
        tokens.push(address(token));
    }

    function getAllTokens() public view returns(address[] memory) {
        return tokens;
    }
}
