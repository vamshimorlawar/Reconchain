-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 15, 2023 at 01:58 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reconchain`
--

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `id` int(11) NOT NULL,
  `candidate_email` varchar(100) NOT NULL,
  `company_email` varchar(100) NOT NULL,
  `job_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `application`
--

INSERT INTO `application` (`id`, `candidate_email`, `company_email`, `job_id`) VALUES
(1, 'deep@gmail', 'i@i', 2),
(2, 'deep@gmail', 'i@i', 6),
(4, 'krishna@gmail', 'i@i', 15),
(5, 'xyz@gmail', 'i@i', 2),
(6, 'xyz@gmail', 'i@i', 16),
(7, 'xyz@gmail', 'tech@tc.com', 12),
(8, 'xyz@gmail', 'i@i', 14),
(9, 'vipul@gmail.com', 'i@i', 14),
(10, 'u1@u1', 'c1@c1', 17);

-- --------------------------------------------------------

--
-- Table structure for table `candidate_profile`
--

CREATE TABLE `candidate_profile` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `rating` int(11) NOT NULL,
  `interests` varchar(100) NOT NULL,
  `education` varchar(100) NOT NULL,
  `experience` varchar(1000) NOT NULL,
  `skills` varchar(1000) NOT NULL,
  `languages` varchar(200) NOT NULL,
  `mobile` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidate_profile`
--

INSERT INTO `candidate_profile` (`id`, `username`, `email`, `rating`, `interests`, `education`, `experience`, `skills`, `languages`, `mobile`) VALUES
(2, 'riya', 'riya@gmail', 0, 'sde', 'Mtech', '3 Years', 'C++', 'C, C++, Python', '1234567890'),
(3, 'Vipul', 'vipul@gmail.com', 0, 'python', 'MTech', '2 years', 'C, C++', 'Python', '9291919191'),
(4, 'anish', 'an@an', 0, 'python', '', '50Year', '', '', ''),
(5, 'Vinay Agrawal', 'vinayagrawalbhilai29@gmail.com', 0, 'sde', 'MTech CSE', '', '', '', ''),
(6, 'Deepak Mathur', 'mathurdeepak09061999@gmail.com', 6, 'sde', 'MTech', '# Year', 'Kill', 'Hindi', '9922671311');

-- --------------------------------------------------------

--
-- Table structure for table `company_profile`
--

CREATE TABLE `company_profile` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `rating` int(20) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `website` varchar(100) NOT NULL,
  `about` varchar(500) NOT NULL,
  `number_job_posts` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_profile`
--

INSERT INTO `company_profile` (`id`, `username`, `email`, `rating`, `company_name`, `location`, `mobile`, `website`, `about`, `number_job_posts`) VALUES
(2, 'tata', 'tcs@email.com', 0, '', '', '', '', '', 0),
(3, 'Tehverito', 'tech@tc.com', 0, 'TechVerito', 'Pune', '1234567890', 'www.techverito.com', 'SDE', 0),
(4, 'Wipro', 'wipro@wipro', 0, '', '', '', '', '', 0),
(5, '3DPLM', 'plm@plm', 0, '3DPLM', 'Pune', '23121323424', '3dplm.cpm', 'Lorem Ipsum', 0),
(6, 'Google', 'google@google.cp', 0, '', '', '', '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `hiring`
--

CREATE TABLE `hiring` (
  `id` int(11) NOT NULL,
  `company_email` varchar(100) NOT NULL,
  `job_id` int(11) NOT NULL,
  `candidate_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hiring`
--

INSERT INTO `hiring` (`id`, `company_email`, `job_id`, `candidate_email`) VALUES
(14, 'google@google.cp', 19, 'vinayagrawalbhilai29@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `job_posts`
--

CREATE TABLE `job_posts` (
  `id` int(11) NOT NULL,
  `company_email` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `tag` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `salary` varchar(100) NOT NULL,
  `report` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_posts`
--

INSERT INTO `job_posts` (`id`, `company_email`, `title`, `description`, `tag`, `location`, `type`, `salary`, `report`) VALUES
(2, 'i@i', 'Vamshi', 'Vamshi', 'Vamshi', 'Vamshi', 'VAmshi', '1', 1),
(3, 'i@i', 'vinay', 'UI UX', 'UIX UX', 'Kanpur', 'Remote', '30000000', 5),
(4, 'tcs@email.com', 'Software Testing Engineer', 'Lorem Ipsum', 'sde', 'Delhi', 'Remote', '300000', 1),
(6, 'i@i', 'QA Engineer', 'File System, Slenium', 'qa', 'Chnadigarh', 'Full Time', '456000', 1),
(12, 'tech@tc.com', 'Software Engineer', 'Lorem ipsum', 'sde', 'Pune, Mumbai', 'Full time', '1234567', 3),
(14, 'plm@plm', 'Software Developers', 'Lorem Ipsum etc etc', 'sde', 'Mumbai', 'Full Time', '1234567', 0),
(15, 'tcs@email.com', 'Laravel Developer', 'Haa re', 'python', 'Pune', 'Full Time', '123456789', 0),
(16, 'tcs@email.com', 'q', 'q', 'python', 'Delhi', 'Remote', '432234', 0),
(17, 'tcs@email.com', 'e', 'e', 'python', 'g', 'g', '7656', 0),
(18, 'tcs@email.com', 't', 't', 'python', 't', 't', '76854', 0),
(19, 'google@google.cp', 'Software Developer', 'Software development refers to a set of computer science activities dedicated to the process of creating, designing, deploying and supporting software. Software itself is the set of instructions or programs that tell a computer what to do. It is independent of hardware and makes computers programmable.', 'sde', 'NewYork, USA', 'Remote', '200000', 0),
(20, 'google@google.cp', 'Software Developer 2', 'A Software Development Engineer (SDE) is responsible for creating cross-platform applications and software systems, applying the principles of computer science, computer engineering, information technology and analysis to help organizations and individuals make informed decisions.', 'sde', 'Pune', 'Remote', '124000', 0),
(21, 'google@google.cp', 'ML Developer', 'A machine learning (ML) developer is an expert on using data to training models. The models are then used to automate processes like image classification, speech recognition, and market forecasting. Definitions of machine learning roles can vary.', 'sde', 'Delhi', 'Remote', '25,40,000', 0);

-- --------------------------------------------------------

--
-- Table structure for table `job_report_history`
--

CREATE TABLE `job_report_history` (
  `id` int(11) NOT NULL,
  `candidate_email` varchar(100) NOT NULL,
  `job_id` int(11) NOT NULL,
  `report_flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userType` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`id`, `name`, `email`, `password`, `userType`) VALUES
(16, 'riya', 'riya@gmail', '123', 'candidate'),
(22, 'tata', 'tcs@email.com', '123', 'company'),
(23, 'Vipul', 'vipul@gmail.com', '12345', 'candidate'),
(24, 'Tehverito', 'tech@tc.com', '123', 'company'),
(25, 'Wipro', 'wipro@wipro', '123', 'company'),
(26, '3DPLM', 'plm@plm', '123', 'company'),
(27, 'anish', 'an@an', '123', 'candidate'),
(28, 'Vinay Agrawal', 'vinayagrawalbhilai29@gmail.com', '12345', 'candidate'),
(29, 'Google', 'google@google.cp', '12345', 'company'),
(30, 'Deepak Mathur', 'mathurdeepak09061999@gmail.com', '123', 'candidate');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidate_profile`
--
ALTER TABLE `candidate_profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_profile`
--
ALTER TABLE `company_profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hiring`
--
ALTER TABLE `hiring`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_posts`
--
ALTER TABLE `job_posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_report_history`
--
ALTER TABLE `job_report_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidate_profile`
--
ALTER TABLE `candidate_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `company_profile`
--
ALTER TABLE `company_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `hiring`
--
ALTER TABLE `hiring`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `job_posts`
--
ALTER TABLE `job_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `job_report_history`
--
ALTER TABLE `job_report_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
