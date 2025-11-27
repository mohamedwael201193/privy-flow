// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivyFlowVault is ERC4626, Ownable {
    constructor(IERC20 _asset, string memory _name, string memory _symbol) 
        ERC4626(_asset) 
        ERC20(_name, _symbol) 
        Ownable(msg.sender)
    {}

    // Future: Add logic to deploy capital to other protocols (e.g., Aave, Katana)
    // For now, it's a simple vault where yield comes from external deposits (e.g. protocol fees)
}
