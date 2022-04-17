// SPDX-License-Identifier:  MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CEGToken is ERC20, Ownable {
    constructor() public ERC20("CanCan Education Governance Token", "CEG") {
        _mint(msg.sender, 1000000 * (10**18));
    }

    // Owner mint tokens on his account, and approve some amount of token to TradeCenter2 contract
    function mint(uint256 _amount) public onlyOwner {
        _mint(msg.sender, _amount);
    }
}
