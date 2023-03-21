// SPDX-License-Identifier: UNLICENCED

pragma solidity >=0.7.0 <0.9.0;

contract Reconchain {
    
    struct Candidate {
        string name;
        string email;
        uint256 rewardPoints;
        // mapping(address => bool) jobApplications;
    }
    

    struct Company {
        string name;
        string email;
        uint256 rewardPoints;
        uint256 totalJobPosting;
        // mapping(uint256 => JobPosting) jobPostings;
        // mapping(address => bool) jobOffers;
    }
    
    struct JobPosting {
        string title;
        string description;
        address company;
        uint256 rewardPoints;
        address[] selectedCandidates;
    }
    
    mapping(address => Candidate) public candidates;
    mapping(address => Company) public companies;
    mapping(address => JobPosting[]) public jobPostings;
    
    uint256 public maxCandidateApplications = 10;
    uint256 public maxCompanyPostings = 10;
    uint256 public maxHiresPerRole = 2;
    
    event CandidateProfileCreated(address candidateAddress);
    event CandidateProfileUpdated(address candidateAddress);
    event CandidateProfileDeleted(address candidateAddress);
    event CompanyProfileCreated(address companyAddress);
    event CompanyProfileUpdated(address companyAddress);
    event CompanyProfileDeleted(address companyAddress);
    event JobPostingCreated(address jobPostingAddress, uint256);
    event JobPostingUpdated(address jobPostingAddress);
    event JobPostingDeleted(address jobPostingAddress);
    event JobApplicationCreated(address candidateAddress, address jobPostingAddress);
    event JobApplicationDeleted(address candidateAddress, address jobPostingAddress);
    event JobOfferCreated(address companyAddress, address candidateAddress, address jobPostingAddress);
    event JobOfferAccepted(address companyAddress, address candidateAddress, address jobPostingAddress);
    event JobOfferRejected(address companyAddress, address candidateAddress, address jobPostingAddress);
    
    modifier onlyCandidate() {
        require(bytes(candidates[msg.sender].name).length != 0, "Not a candidate");
        _;
    }
    
    modifier onlyCompany() {
        require(bytes(companies[msg.sender].name).length != 0, "Not a company");
        _;
    }
    
    // create candidate profile
    function createCandidateProfile(string memory name, string memory email) public returns(address) {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(email).length > 0, "Email cannot be empty");
        require(bytes(candidates[msg.sender].name).length == 0, "Candidate profile already exists");
        
        candidates[msg.sender].name = name;
        candidates[msg.sender].email = email;
        candidates[msg.sender].rewardPoints = 0;
        // candidates[msg.sender] = Candidate(name, email, 0);
        
        emit CandidateProfileCreated(msg.sender);
        return(msg.sender);
    }
    
    // update candidate
    function updateCandidateProfile(string memory name, string memory email) public onlyCandidate {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(email).length > 0, "Email cannot be empty");
        
        candidates[msg.sender].name = name;
        candidates[msg.sender].email = email;
        
        emit CandidateProfileUpdated(msg.sender);
    }
    
    // delete candidate
    function deleteCandidateProfile() public onlyCandidate {
        delete candidates[msg.sender];
        
        emit CandidateProfileDeleted(msg.sender);
        // delete company
    }
    
    // create company
    function createCompanyProfile(string memory name, string memory email) public returns(address){
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(email).length > 0, "Email cannot be empty");
        require(bytes(companies[msg.sender].name).length == 0, "Company profile already exists");
        
        companies[msg.sender].name = name;
        companies[msg.sender].email = email;
        companies[msg.sender].rewardPoints = 0;


        emit CompanyProfileCreated(msg.sender);
        return(msg.sender);
    }


    // update company
    function updateCompanyProfile(string memory name, string memory email) public onlyCompany {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(email).length > 0, "Email cannot be empty");
        
        companies[msg.sender].name = name;
        companies[msg.sender].email = email;
        
        emit CompanyProfileUpdated(msg.sender);
    }
    
    // delete company
    function deleteCompanyProfile() public onlyCompany {
        delete companies[msg.sender];
        delete jobPostings[msg.sender];
        
        emit CompanyProfileDeleted(msg.sender);
    }


    // jobposting creating
    function createJobPosting(string memory title, string memory description) public onlyCompany{
        require(companies[msg.sender].totalJobPosting <= maxCompanyPostings,"You already have maximum active job postings");
        uint256 tempIndex = companies[msg.sender].totalJobPosting;

        JobPosting memory temp ;
        temp.title = title;
        temp.description = description;
        temp.company = msg.sender;
        
        jobPostings[msg.sender].push(temp);
        emit JobPostingCreated(msg.sender, tempIndex);
        companies[msg.sender].totalJobPosting +=1;
    }


    // TODO:funciton that will return all the posts by that company given their address
}