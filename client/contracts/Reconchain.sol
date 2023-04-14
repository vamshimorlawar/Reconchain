// SPDX-License-Identifier: UNLICENCED

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";

contract Reconchain {

    string private reconchain;

    constructor(string memory _reconchain) {
        console.log("Deploying a Greeter with greeting");
        reconchain = _reconchain;    
    }
    
    struct Candidate {
        string name;
        string email;
        uint256 rewardPoints;
        uint256 jobApplications;
        mapping (address=> uint)applicationsForCompany;
    }
    

    struct Company {
        string name;
        string email;
        uint256 rewardPoints;
        uint256 activeJobPosting;
        uint256 totalJobPosting;
        // mapping(uint256 => JobPosting) jobPostings;
        // mapping(address => bool) jobOffers;
    }
    
    struct JobPosting {
        string title;
        string description;
        address company;
        bool active;
        address[] appliedCandidates;
        address selectedCandidate;
    }
    
    mapping(address => Candidate) private candidates;
    mapping(address => Company) private companies;
    mapping(address => mapping(uint256 => JobPosting)) private jobPostings;
    
    uint256 private constant maxCandidateApplications = 10;
    uint256 private constant maxCompanyPostings = 10;
    uint256 private constant maxHiresPerRole = 1;
    
    event CandidateProfileCreated(address candidateAddress);
    event CandidateProfileUpdated(address candidateAddress);
    event CandidateProfileDeleted(address candidateAddress);
    event CompanyProfileCreated(address companyAddress);
    event CompanyProfileUpdated(address companyAddress);
    event CompanyProfileDeleted(address companyAddress);
    event JobPostingCreated(address jobPostingCompanyAddress, uint256 postIndex);
    event JobPostingUpdated(address jobPostingCompanyAddress, uint256 postIndex);
    event JobPostingDeleted(address jobPostingCompanyAddress, uint256 postIndex);
    event JobApplicationCreated(address candidateAddress, uint postIndex, address jobCompanyAddress);
    // event JobApplicationDeleted(address candidateAddress, address jobPostingAddress);
    // event JobOfferCreated(address companyAddress, address candidateAddress, address jobPostingAddress);
    event JobOfferAccepted(address companyAddress, address candidateAddress, address jobPostingAddress);
    // event JobOfferRejected(address companyAddress, address candidateAddress, address jobPostingAddress);
    
    modifier onlyCandidate() {
        require(bytes(candidates[msg.sender].name).length != 0, "Not a candidate");
        _;
    }
    
    modifier onlyCompany() {
        require(bytes(companies[msg.sender].name).length != 0, "Not a company");
        _;
    }
    
    // create candidate profile
    function createCandidateProfile(string memory name, string memory email) public {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(email).length > 0, "Email cannot be empty");
        require(bytes(candidates[msg.sender].name).length == 0, "Candidate profile already exists");
        
        candidates[msg.sender].name = name;
        candidates[msg.sender].email = email;
        candidates[msg.sender].rewardPoints = 0;
        // candidates[msg.sender] = Candidate(name, email, 0);
        
        emit CandidateProfileCreated(msg.sender);
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
    function createCompanyProfile(string memory name, string memory email) public{
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(email).length > 0, "Email cannot be empty");
        require(bytes(companies[msg.sender].name).length == 0, "Company profile already exists");
        
        companies[msg.sender].name = name;
        companies[msg.sender].email = email;
        companies[msg.sender].rewardPoints = 0;


        emit CompanyProfileCreated(msg.sender);
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
        for(uint256 i =1; i<=companies[msg.sender].totalJobPosting; i++){
            jobPostings[msg.sender][i].active = false;

        }
        delete companies[msg.sender]; 
        emit CompanyProfileDeleted(msg.sender);
    }


    // jobposting creating
    function createJobPosting(string memory title, string memory description) public onlyCompany{
        require(companies[msg.sender].activeJobPosting < maxCompanyPostings,"You already have maximum active job postings");

        uint256 tempIndex = companies[msg.sender].totalJobPosting;
        

        JobPosting memory tempJobPost ;
        tempJobPost.title = title;
        tempJobPost.description = description;
        tempJobPost.company = msg.sender;
        tempJobPost.active = true;
        
        companies[msg.sender].totalJobPosting +=1;
        companies[msg.sender].activeJobPosting +=1;

        jobPostings[msg.sender][tempIndex+1] = tempJobPost;
        emit JobPostingCreated(msg.sender, tempIndex+1);
    }
    // updating job posting

    function updateJobPosting(uint256 ind,string memory title, string memory description) public onlyCompany{
        
        require(bytes(jobPostings[msg.sender][ind].title).length != 0, "job posting does not exist exists");
        require(jobPostings[msg.sender][ind].active == true, "the post is not active anymore");
        jobPostings[msg.sender][ind].title = title;
        jobPostings[msg.sender][ind].description = description;

        emit JobPostingUpdated(msg.sender, ind);
    }
    //deleting job posting

    function deleteJobPosting(uint256 ind) public onlyCompany{

        require(bytes(jobPostings[msg.sender][ind].title).length != 0, "job posting does not exist exists");
        jobPostings[msg.sender][ind].active = false;
        companies[msg.sender].activeJobPosting -=1;

        emit JobPostingDeleted(msg.sender, ind);
    }

    // candidate application for the job
    function createJobApplication(uint256 ind, address companyAddress) public onlyCandidate{
        require(candidates[msg.sender].jobApplications < maxCandidateApplications,"You already have maximum active job applications");
        require(candidates[msg.sender].applicationsForCompany[companyAddress] < maxHiresPerRole,"You already have maximum active job applications for this company");
        require(jobPostings[companyAddress][ind].active == true, "the post is not active anymore");


        
        candidates[msg.sender].jobApplications += 1;
        candidates[msg.sender].applicationsForCompany[companyAddress] +=1;
        jobPostings[companyAddress][ind].appliedCandidates.push(msg.sender);


    emit JobApplicationCreated(msg.sender, ind, companyAddress);
    }


    // company accepting job application for the candidate
    function acceptingJobOffer(uint256 ind, address candidateAddress) public onlyCompany{
        require(bytes(candidates[candidateAddress].name).length != 0, "Candidate profile does not exists");
        require(jobPostings[msg.sender][ind].active == true, "the post is not active anymore");
        require((jobPostings[candidateAddress][ind].selectedCandidate) == address(0), "Candidate already selected for this post");

        address[] memory tempList = jobPostings[msg.sender][ind].appliedCandidates;
        for(uint256 i=0; i<tempList.length; i++){
            candidates[tempList[i]].jobApplications -= 1;
            candidates[tempList[i]].applicationsForCompany[msg.sender] -=1;
        }

        // candidates[candidateAddress].jobApplications -= 1;
        // candidates[candidateAddress].applicationsForCompany[msg.sender] -=1;
        jobPostings[msg.sender][ind].active = false;
        jobPostings[msg.sender][ind].selectedCandidate = candidateAddress;
        companies[msg.sender].activeJobPosting -= 1;
    emit JobApplicationCreated(candidateAddress, ind, msg.sender);
    }

    // TODO return all candidate list for a  post
    function candidateList(uint256 ind) public view onlyCompany returns(address [] memory){
        return(jobPostings[msg.sender][ind].appliedCandidates);
    }
}