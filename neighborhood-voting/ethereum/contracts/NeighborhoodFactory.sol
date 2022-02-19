// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./Neighborhood.sol";

contract NeighborhoodFactory {
    address[] public neighborhoods;

    function createNeighborhood(string memory _name) public {
        Neighborhood neighborhood = new Neighborhood(msg.sender, _name);
        neighborhoods.push(address(neighborhood));
    }

    function getAllNeighborhoods() public view returns(address[] memory) {
        return neighborhoods;
    }
}
