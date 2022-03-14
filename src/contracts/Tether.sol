// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

contract Tether {
    string public name = "Tether";
    string public symbol = "USDT";
    uint256 public totalSupply = 10000000000000000000;
    uint8 public decimal = 18;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approve(address indexed _owner, address indexed _to, uint256 _value);
}
