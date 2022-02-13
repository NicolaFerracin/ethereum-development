// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    uint8 decimalsDigits;

    constructor(string memory _name, string memory _symbol, uint _initialSupply, uint8 _decimals) ERC20(_name, _symbol) {
        _mint(msg.sender, _initialSupply);
        decimalsDigits = _decimals;
    }

    function decimals() public view virtual override returns (uint8) {
        return decimalsDigits;
    }
}
