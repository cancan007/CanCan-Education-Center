pragma solidity ^0.8.4;
pragma abicoder v2; // required to accept structs as function parameters

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol"; // to create my own token or make available the token on smart contract

contract EducationCenter {
    address public cegTokenAddress;
    IERC20 public cegToken;
    uint256 public startTime;
    uint256 public date;
    address private owner;

    constructor(address _cegToken) {
        cegTokenAddress = _cegToken;
        cegToken = IERC20(_cegToken);
        startTime = block.timestamp;
        date = block.timestamp;
        owner = msg.sender;
    }

    // customer => amount funded
    mapping(address => uint256) public customerFundedAmount;
    mapping(address => uint256) public customerCEGAmount;
    address[] public customers;
    uint256 public totalFund;
    uint256 public needCEGToken; // amount needed to mint YamToken

    function fundToken() public payable {
        require(msg.value > 0, "You have to pay more 0");
        customerFundedAmount[msg.sender] += msg.value;
        totalFund += msg.value;
        if (!findCustomer(msg.sender)) {
            customers.push(msg.sender);
        }
    }

    function repayToken(uint256 _amount) public {
        require(
            customerFundedAmount[msg.sender] >= _amount,
            "Over amount you funded"
        );
        payable(msg.sender).transfer(_amount);
        customerFundedAmount[msg.sender] -= _amount;
        totalFund -= _amount;
        if (customerFundedAmount[msg.sender] <= 0) {
            removeFromCustomers(msg.sender);
        }
    }

    // to determine the incentive of the day
    function defineCEGAmount(uint256 _amount) public {
        require(timeIsPassed(), "Not the time to mint yet");
        require(
            showCEGAllowance() >= (_amount + needCEGToken),
            "This contract doesn't have enough allowance"
        );

        date = date + 1 days;
        for (uint256 i = 0; i < customers.length; i++) {
            address cus = customers[i];
            uint256 amount = customerFundedAmount[cus];
            uint256 ratio = (amount * 10**18) / totalFund;
            customerCEGAmount[cus] += (ratio * _amount) / (10**18);
        }

        needYamToken += _amount;
    }

    // invester have to call this function manually to get Yam Token
    function mintCEGToken() public {
        require(
            customerCEGAmount[msg.sender] > 0,
            "You don't have Yam Token amount on this"
        );
        cegToken.transferFrom(owner, msg.sender, customerCEGAmount[msg.sender]);
        customerCEGAmount[msg.sender] = 0;
        needCEGToken -= customerCEGAmount[msg.sender];
    }

    // to give thie contact the right to handle _amount of owner's yam token
    /* this func didn't work
    function approveYamAmount(uint256 _amount) public {
        require(msg.sender == owner, "This func can be called by only owner");
        yamToken.approve(address(this), _amount);
    }*/

    function showCEGAllowance() public view returns (uint256) {
        return cegToken.allowance(owner, address(this));
    }

    function timeIsPassed() private view returns (bool) {
        uint256 gap = block.timestamp - date;
        /*
        if (gap >= 1 days) {
            return true;
        }*/

        // this is just for test
        if (gap >= 1) {
            return true;
        }

        return false;
    }

    function findCustomer(address _customer) private view returns (bool) {
        for (uint256 i = 0; i < customers.length; i++) {
            address cus = customers[i];
            if (_customer == cus) {
                return true;
            }
        }
        return false;
    }

    // have to test when there is only one person in customers list
    function removeFromCustomers(address _user) internal {
        uint256 index;
        for (uint256 i = 0; i < customers.length; i++) {
            if (customers[i] == _user) {
                index = i;
                break;
            }
        }

        for (uint256 e = index; e < customers.length - 1; e++) {
            customers[e] = customers[e + 1];
        }

        customers.pop(); // to remove last element
    }
}
