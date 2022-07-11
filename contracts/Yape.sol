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
    uint totalDonaciones;

    mapping(address => Transaction[]) yapeos;
    mapping(address => uint) donaciones;

    event Transactions(address _fromAddress, address _toAddress, uint _ammount);
    event Donations(address _fromAddress, uint _ammount);

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Tu no eres el owner");
        _;
    }

    function yapear(address payable receiver, string memory comment, string memory date) public payable {

        require(msg.sender != receiver, "No puedes yapearte a ti mismo");
        require(msg.value > 0, "Tienes que enviar ethers");

        receiver.transfer(msg.value);

        yapeos[msg.sender].push(Transaction(receiver, msg.value, "-", comment, date));
        yapeos[receiver].push(Transaction(msg.sender, msg.value, "+", comment, date));

        emit Transactions(msg.sender, receiver, msg.value);
    }

    function verYapeos() public view returns (Transaction[] memory) {
        return yapeos[msg.sender];
    }

    function verDonaciones() isOwner public view returns (uint){
        return totalDonaciones;
    }

    receive() external payable {
        donaciones[msg.sender] +=msg.value;
        totalDonaciones +=msg.value;
        emit Donations(msg.sender, msg.value);
    }

    fallback() external payable {
        //No deberia llegar acá
    }

    function getOwner() external view returns (address) {
        return owner;
    }

}