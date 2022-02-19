// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Neighborhood is Ownable {
    string public name;
    mapping(address => bool) public residents;
    mapping(uint => Proposal) public proposals;
    uint public proposalId;
    uint public residentsCount;

    struct Proposal {
        string name;
        string link;
        mapping(address => uint) votes;
        uint votesCount;
        uint moneyCollected;
        bool complete;
        bool cancelled;
    }

    modifier onlyResident() {
        require(residents[msg.sender], "You are not registered as a resident of this neighborhood");
        _;
    }

    modifier onlyActive(uint _id) {
        Proposal storage proposal = proposals[_id];
        require(!proposal.complete, "The proposal has already been completed");
        require(!proposal.cancelled, "The proposal has been cancelled");
        _;
    }

    constructor(address _manager, string memory _name) {
        _transferOwnership(_manager);
        name = _name;
    }

    function verifyResident(address _resident) public onlyOwner {
        residents[_resident] = true;
        residentsCount++;
    }

    function createProposal(string memory _name, string memory _link) public onlyOwner {
        Proposal storage proposal = proposals[proposalId++];
        proposal.name = _name;
        proposal.link = _link;
        proposal.moneyCollected = 0;
        proposal.votesCount = 0;
        proposal.complete = false;
        proposal.cancelled = false;
    }

    function voteProposal(uint _id) public onlyResident onlyActive(_id) payable {
        require(msg.value > 0, "You need to contribute some funds to the proposal");
        Proposal storage proposal = proposals[_id];
        if (proposal.votes[msg.sender] == 0) {
            proposal.votesCount++;
        }
        proposal.votes[msg.sender] += msg.value;
        proposal.moneyCollected += msg.value;
    }

    function finalizeProposal(uint _id) public onlyOwner onlyActive(_id) {
        Proposal storage proposal = proposals[_id];
        payable(msg.sender).transfer(proposal.moneyCollected);
        proposal.complete = true;
    }

    function rejectProposal(uint _id) public onlyOwner onlyActive(_id) {
        Proposal storage proposal = proposals[_id];
        proposal.cancelled = true;
    }

    function withdrawFromProposal(uint _id) public onlyResident {
        Proposal storage proposal = proposals[_id];
        require(proposal.cancelled, "The proposal has not yet been cancelled by the manager");
        payable(msg.sender).transfer(proposal.votes[msg.sender]);
        proposal.moneyCollected -= proposal.votes[msg.sender];
    }
}