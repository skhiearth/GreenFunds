// Version of Solidity
pragma solidity >=0.5.0;

// GreenFunds Contract
contract GreenFunds {

    uint public fundCount = 0; // Track the total number of funds 
    uint public requestsCount = 0; // Track the total number of requests 
    mapping(uint => Fund) public funds; // Mapping of fund id to fund struct
    mapping(uint => Request) public requests; // Mapping of request id to request struct

    using SafeMath for int256;
    
    // Fund Structure
    struct Fund {
        uint identity; // Unique identifier
        string fundName; // Fund display name
        string fundDetail; // Fund description 
        uint fundAmount; // Needed amount
        uint remainingAmount; // Remaining value in fund
        uint claimedAmount; // Claimed value of the fund
        address payable funder; // Creator's address
        address payable organisation;
    }
    
    // Request Structure
    struct Request {
        uint id; // Unique identifies
        uint fundId; // Unique identifier of the fund
        string fundName; // Fund details
        string requestDetail; // Request details
        uint value; // Value of crypto requested
        address payable funder; // Address of loanee
        address payable organisation; // Address of requester
        uint remainingAmount; // Remaining value in fund at time of request
        uint claimedAmount; // Claimed value of the fund at time of request
        bool approved; // Approval Status
    }
    
    // Create a new fund
    function newFund(string memory name, string memory detail) public payable {
        Fund storage c = funds[fundCount]; // New fund object
        
        c.identity = fundCount; // Set identifier
        c.fundName = name; // Set fund name
        c.fundDetail = detail; // Set fund details
        c.funder = msg.sender; // Set creator's address
        c.fundAmount = msg.value; // Set fund total value
        c.remainingAmount = msg.value; // Remaining Amount in Fund
        c.claimedAmount = 0; // Claimed amount in the fund
        fundCount++; // Increment identifier for subsequent creation
    }
    
    // Send Fund Request
    function fundRequest(uint _id, string memory detail, uint amount) public payable {
        Fund storage l = funds[_id]; // Fetch associated fund
        
        Request storage r = requests[requestsCount]; // Fetch associated request
        r.id = requestsCount; // Set identifier
        r.value = amount; // Set value
        r.fundName = l.fundName; // Set name
        r.requestDetail = detail;
        r.funder = l.funder; // Set loanee
        r.fundId = l.identity; // Set fund identifier
        r.organisation = msg.sender; // Set organisation's address
        r.remainingAmount = l.remainingAmount;
        r.claimedAmount = l.claimedAmount;
        requestsCount++; // Increment request count
    }
    
    // Approve request
    function approveRequest(uint _id, uint reqid) public payable {
        Fund storage l = funds[_id]; // Fetch associated fund
        require(msg.sender == l.funder, 'You are not authorised'); // Check authorisation

        Request storage r = requests[reqid]; // Fetch associated request
        r.approved = true; // Set approval status to true
        
        l.remainingAmount = l.remainingAmount - r.value;
        l.claimedAmount = l.claimedAmount + r.value;

        l.organisation = r.organisation;
        
        r.organisation.transfer(r.value); // Send funds
    }
    
    // Decline request
    function declineRequest(uint _id, uint reqid) public payable {
        Fund storage l = funds[_id]; // Fetch associated fund
        require(msg.sender == l.funder, 'You are not authorised'); // Check authorisation

        Request storage r = requests[reqid]; // Fetch associated request
        r.approved = false; // Set approval status to false
        delete requests[reqid]; // Delete request
    }
    
}

library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}