pragma solidity ^0.8.4;
pragma abicoder v2; // required to accept structs as function parameters

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol"; // to create my own token or make available the token on smart contract

contract DonateMe is Ownable {
    uint256 public donatedEth;

    function donateMe() public payable {
        require(msg.value > 0, "You have to donate over 0");
        donatedEth += 0;
    }

    function withDraw(uint256 _amount) public onlyOwner {
        payable(msg.sender).transfer(_amount);
        donatedEth -= _amount;
    }
}
