// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

    struct Transaction {
        address receiver;
        uint amount;
        string action;
        string comment;
        string date;
    }

contract Yape {

    address owner;
    mapping(address => Transaction[]) yapeos;

    event Transactions(address _fromAddress, address _toAddress, uint _ammount);

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }


    function yapear(address payable receiver, string calldata comment, string calldata date) public payable {

        require(msg.sender != receiver, "No puedes yapearte a ti mismo");
        require(msg.value > 0, "Tienes que enviar ethers");

        receiver.transfer(msg.value);

        yapeos[msg.sender].push(Transaction(receiver, msg.value, "send", comment, date));
        yapeos[receiver].push(Transaction(msg.sender, msg.value, "receive", comment, date));

        emit Transactions(msg.sender, receiver, msg.value);
    }

    function verYapeos() public view returns (Transaction[] memory) {
        return yapeos[msg.sender];
    }

}