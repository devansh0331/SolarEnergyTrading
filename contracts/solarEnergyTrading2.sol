// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SolarEnergyTrading2 {
    // CODE TO BE DELETED BELOW
    struct Readings {
        uint voltage;
        uint current;
    }

    Readings[] public readings;

    function storeReadings(uint _voltage, uint _current) public {
        readings.push(Readings(_voltage, _current));
    }

    function getReadings() public view returns (Readings[] memory) {
        return readings;
    }

    // CODE TO BE DELETED ABOVE

    // Producer address
    address public producer;

    // Maximum Power Transfer -> Conversion Rate * Deposit Amount by Buyer
    uint256 public maxPowerTransfer;

    // Minimum value / diff to send alert -> maxPowerSupply - energy used (We will use this further)
    uint256 public thresholdValue;

    // Conversion Rate -> Value of energy per eth
    uint256 public perUnitPrice;

    // If the trade successfully executed
    bool public tradeSuccess;

    // Mapping consumer address to amount deposit
    mapping(address => uint256) public consumer;

    constructor(address _producer, uint256 _perUnitPrice) {
        producer = _producer;
        perUnitPrice = _perUnitPrice; // --> per unit price (in eth)
    }

    // Consumer pre paid some eth into contract
    function preDeposit() public payable {
        if (consumer[msg.sender] != 0) {
            consumer[msg.sender] += msg.value;
            (bool success, ) = payable(address(this)).call{value: msg.value}(
                ""
            );
            require(success, "Failed to deposit money!");
        } else {
            consumer[msg.sender] = msg.value;
            (bool success, ) = payable(address(this)).call{value: msg.value}(
                ""
            );
            require(success, "Failed to deposit money!");
        }
        // maxPowerTransfer = perUnitPrice * msg.value; // --> TO BE UPDATE (Removed as per instruction )
    }

    receive() external payable {}

    // function energyTrade(uint256 _meterValue) public payable {
    //     // 500 - 600 == -100 < 0
    //     // if (maxPowerTransfer - _meterValue < thresholdValue) {}
    //     if (address(this).balance != 0) {
    //         if (_meterValue >= maxPowerTransfer) {
    //             (bool success, ) = payable(producer).call{
    //                 value: address(this).balance
    //             }("");
    //             require(success, "");
    //             tradeSuccess = true;
    //         }
    //     }
    // }

    function energyTrade(uint256 _amount, uint256 _digit) public payable {
        require(consumer[msg.sender] != 0, "Not enough eth");

        if (_digit == 0) {
            (bool success, ) = payable(producer).call{value: _amount}("");
            require(success, "");
            consumer[msg.sender] -= _amount;
            tradeSuccess = true;
        }
        if (_digit == 1) {
            (bool success, ) = payable(producer).call{value: _amount}("");
            require(success, "");
            consumer[msg.sender] = 0;
            tradeSuccess = true;
        }

        // (bool success, ) = payable(producer).call{
        //     value: address(this).balance
        // }("");
    }

    function getBalance() public view returns (uint256) {
        require(consumer[msg.sender] != 0, "No Amount Deposited");
        return consumer[msg.sender];
    }

    function getTradeSuccess() public view returns (bool) {
        return tradeSuccess;
    }
}
