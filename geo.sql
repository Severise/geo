-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2020 at 09:40 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `geo`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `letter` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `number`, `letter`) VALUES
(1, 11, 'А'),
(2, 11, 'Б'),
(3, 11, 'В');

-- --------------------------------------------------------

--
-- Table structure for table `maps`
--

CREATE TABLE `maps` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `maps`
--

INSERT INTO `maps` (`id`, `name`) VALUES
(1, 'Иркутская область');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `result` int(11) NOT NULL,
  `map_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `student_id`, `type`, `result`, `map_id`) VALUES
(1, 1, 'place', 100, 1),
(2, 1, 'river', 67, 1),
(3, 1, 'region', 64, 1),
(4, 4, 'region', 93, 1),
(5, 2, 'region', 89, 1),
(6, 3, 'region', 76, 1),
(7, 5, 'region', 98, 1),
(8, 2, 'place', 70, 1),
(9, 3, 'place', 100, 1),
(10, 6, 'region', 100, 1),
(11, 5, 'place', 100, 1),
(12, 4, 'place', 98, 1),
(13, 6, 'place', 100, 1),
(14, 2, 'river', 87, 1),
(15, 3, 'river', 94, 1),
(16, 4, 'river', 75, 1),
(17, 6, 'river', 80, 1),
(18, 5, 'river', 72, 1),
(19, 5, 'city', 71, 1),
(20, 4, 'city', 68, 1),
(21, 3, 'city', 51, 1),
(22, 2, 'city', 93, 1),
(23, 6, 'city', 62, 1);

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf16 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`id`, `name`) VALUES
(1, 'Школа №29 г. Иркутска'),
(2, 'МБОУ г. Иркутска СОШ №76'),
(3, 'Школа № 31'),
(4, 'МБОУ СОШ № 64');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `password`, `teacher_id`, `class_id`) VALUES
(1, 'Силин Максим Борисович', 'colurazawe', 1, 1),
(2, 'Антонов Матвей Данилович', 'sihomuluji', 1, 2),
(3, 'Андреев Пётр Валериевич', 'katiyisugu', 1, 3),
(4, 'Виноградов Дмитрий Григорьевич', 'jaxifisutu', 1, 1),
(5, 'Ефимова Кристина Станиславовна', 'javileyila', 1, 1),
(6, 'Фёдорова Полина Даниловна', 'katiyisugu', 1, 1),
(7, 'Макарова Людмила Виталиевна', 'qopequrepu', 1, 1),
(8, 'Орехова Елена Станиславовна', 'xomunalomi', 1, 3),
(9, 'Брагин Артём Артёмович', 'qimihecobe', 1, 2),
(10, 'Крюков Матвей Иванович', 'xecuqogipe', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `login` varchar(50) NOT NULL,
  `school_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `password`, `login`, `school_id`) VALUES
(1, 'Василенко Анна Платоновна', '1a1dc91c907325c69271ddf0c944bc72', 'anna', 1),
(2, 'Мирна Олеся Анатолиевна', '1a1dc91c907325c69271ddf0c944bc72', 'olesya', 1),
(3, 'Гамула Ирина Романовна', '1a1dc91c907325c69271ddf0c944bc72', 'irina', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `maps`
--
ALTER TABLE `maps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `results_ibfk_1` (`student_id`),
  ADD KEY `map_id` (`map_id`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `school_id` (`school_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `maps`
--
ALTER TABLE `maps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `map_id` FOREIGN KEY (`map_id`) REFERENCES `maps` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `class_id` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
