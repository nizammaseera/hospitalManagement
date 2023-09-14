-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2022 at 12:12 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hms`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `starttime` time NOT NULL,
  `endtime` time NOT NULL,
  `status` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `date`, `starttime`, `endtime`, `status`) VALUES
(1, '2022-11-04', '09:00:00', '10:00:00', 'Done');

-- --------------------------------------------------------

--
-- Table structure for table `diagnose`
--

CREATE TABLE `diagnose` (
  `appt` int(11) NOT NULL,
  `doctor` varchar(50) NOT NULL,
  `diagnosis` varchar(40) NOT NULL,
  `prescription` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `diagnose`
--

INSERT INTO `diagnose` (`appt`, `doctor`, `diagnosis`, `prescription`) VALUES
(1, 'sam@gmail.com', ' Sleep man', 'zzzzzzzzzzzz....');

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `email` varchar(50) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `password` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`email`, `gender`, `password`, `name`) VALUES
('sam@gmail.com', 'Male', 'sam12345', 'sam sam');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `email` varchar(50) NOT NULL,
  `password` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(60) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `conditions` varchar(100) NOT NULL,
  `surgeries` varchar(100) NOT NULL,
  `medication` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`email`, `password`, `name`, `address`, `gender`, `conditions`, `surgeries`, `medication`) VALUES
('chan@gmail.com', 'chan12345', 'Chayan Pandit', 'Vill- Chakmanik, P.O.- Bawali, P.S.- Nodakhali', 'Male', 'none', 'none', 'none');

-- --------------------------------------------------------

--
-- Table structure for table `patientsattendappointments`
--

CREATE TABLE `patientsattendappointments` (
  `patient` varchar(50) NOT NULL,
  `appt` int(11) NOT NULL,
  `concerns` varchar(40) NOT NULL,
  `symptoms` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patientsattendappointments`
--

INSERT INTO `patientsattendappointments` (`patient`, `appt`, `concerns`, `symptoms`) VALUES
('chan@gmail.com', 1, 'trial', 'dude i\'m so tired');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `doctor` varchar(50) NOT NULL,
  `starttime` time NOT NULL,
  `endtime` time NOT NULL,
  `breaktime` time NOT NULL,
  `day` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`doctor`, `starttime`, `endtime`, `breaktime`, `day`) VALUES
('sam@gmail.com', '08:00:00', '12:00:00', '10:00:00', 'Monday'),
('sam@gmail.com', '08:00:00', '15:00:00', '11:00:00', 'Wednesday'),
('sam@gmail.com', '08:00:00', '18:00:00', '10:00:00', 'Friday'),
('sam@gmail.com', '16:00:00', '22:00:00', '18:00:00', 'Sunday');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `diagnose`
--
ALTER TABLE `diagnose`
  ADD PRIMARY KEY (`appt`,`doctor`),
  ADD KEY `doctor` (`doctor`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `patientsattendappointments`
--
ALTER TABLE `patientsattendappointments`
  ADD PRIMARY KEY (`patient`,`appt`),
  ADD KEY `appt` (`appt`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`doctor`,`starttime`,`endtime`,`breaktime`,`day`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `diagnose`
--
ALTER TABLE `diagnose`
  ADD CONSTRAINT `diagnose_ibfk_1` FOREIGN KEY (`appt`) REFERENCES `appointment` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `diagnose_ibfk_2` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `patientsattendappointments`
--
ALTER TABLE `patientsattendappointments`
  ADD CONSTRAINT `patientsattendappointments_ibfk_1` FOREIGN KEY (`patient`) REFERENCES `patient` (`email`) ON DELETE CASCADE,
  ADD CONSTRAINT `patientsattendappointments_ibfk_2` FOREIGN KEY (`appt`) REFERENCES `appointment` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
