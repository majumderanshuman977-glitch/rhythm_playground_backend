-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2025 at 08:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rhythm_ride`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('super_admin','manager','staff') DEFAULT 'staff',
  `status` enum('active','inactive') DEFAULT 'active',
  `last_login_at` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `first_name`, `last_name`, `email`, `password_hash`, `role`, `status`, `last_login_at`, `createdAt`, `updatedAt`) VALUES
(1, 'Super', 'Admin', 'admin@example.com', '$2b$10$Br6DM9U5BF0CmcFQLh7qZ.fG406TDJCW4owNtZeSrkOaW2gYY.2EO', 'super_admin', 'active', NULL, '2025-11-10 06:44:44', '2025-11-10 06:44:44');

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `banner` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `banner`, `title`, `is_active`, `createdAt`, `updatedAt`) VALUES
(14, '/uploads/admin/banners/banner-1764741674077-547575372.mp4', 'Banner 1', 1, '2025-12-03 06:01:14', '2025-12-03 06:01:14'),
(15, '/uploads/admin/banners/banner-1764743023799-34820997.mp4', 'Banner 2', 0, '2025-12-03 06:23:43', '2025-12-03 06:23:43'),
(16, '/uploads/admin/banners/banner-1764743115649-89959532.mp4', 'Banner 3', 1, '2025-12-03 06:25:16', '2025-12-03 06:25:16');

-- --------------------------------------------------------

--
-- Table structure for table `class_sessions`
--

CREATE TABLE `class_sessions` (
  `id` int(11) NOT NULL,
  `class_type_id` int(11) NOT NULL,
  `instructor_id` int(11) NOT NULL,
  `studio_id` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `duration_minutes` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `booked_count` int(11) DEFAULT 0,
  `price` decimal(10,2) NOT NULL,
  `status` enum('scheduled','completed','cancelled') DEFAULT 'scheduled',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_sessions`
--

INSERT INTO `class_sessions` (`id`, `class_type_id`, `instructor_id`, `studio_id`, `capacity`, `duration_minutes`, `start_time`, `end_time`, `booked_count`, `price`, `status`, `createdAt`, `updatedAt`) VALUES
(7, 1, 6, 5, 200, 100, '2025-12-04 10:50:00', '2025-12-04 10:50:00', 0, 490.00, 'scheduled', '2025-12-03 10:51:06', '2025-12-03 10:51:06'),
(8, 1, 8, 5, 500, 300, '2025-12-05 10:51:00', '2025-12-05 10:51:00', 0, 500.00, 'scheduled', '2025-12-03 10:51:39', '2025-12-03 10:51:39'),
(9, 5, 8, 6, 600, 50, '2025-12-13 05:21:00', '2025-12-13 05:22:00', 0, 500.00, 'scheduled', '2025-12-03 10:52:05', '2025-12-12 05:21:46'),
(10, 5, 8, 6, 600, 40, '2025-12-12 07:52:00', '2025-12-11 23:52:00', 0, 500.00, 'scheduled', '2025-12-03 10:52:29', '2025-12-12 05:53:10'),
(11, 6, 9, 7, 600, 40, '2025-12-12 18:23:00', '2025-12-12 05:23:00', 0, 600.00, 'scheduled', '2025-12-03 10:53:18', '2025-12-12 05:21:31'),
(12, 1, 19, 5, 50, 60, '2025-12-18 06:16:00', '2025-12-19 06:17:00', 0, 500.00, 'scheduled', '2025-12-17 06:17:12', '2025-12-17 06:17:12'),
(13, 6, 18, 7, 600, 50, '2025-12-19 06:17:00', '2025-12-20 06:17:00', 0, 80.00, 'scheduled', '2025-12-17 06:17:50', '2025-12-17 06:17:50'),
(14, 6, 20, 6, 70, 49, '2025-12-19 06:18:00', '2025-12-20 06:18:00', 0, 80.00, 'scheduled', '2025-12-17 06:18:17', '2025-12-17 06:18:17'),
(15, 7, 20, 8, 90, 80, '2025-12-21 06:18:00', '2025-12-22 06:18:00', 0, 70.00, 'scheduled', '2025-12-17 06:18:42', '2025-12-17 06:18:42'),
(16, 8, 20, 7, 80, 78, '2025-12-25 06:18:00', '2025-12-26 06:18:00', 0, 70.00, 'scheduled', '2025-12-17 06:19:03', '2025-12-17 06:19:03'),
(17, 8, 21, 9, 70, 50, '2025-12-30 06:19:00', '2025-12-31 06:19:00', 0, 80.00, 'scheduled', '2025-12-17 06:19:28', '2025-12-17 06:19:28');

-- --------------------------------------------------------

--
-- Table structure for table `class_type`
--

CREATE TABLE `class_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `duration_minutes` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_type`
--

INSERT INTO `class_type` (`id`, `name`, `description`, `duration_minutes`, `image`, `is_active`, `createdAt`, `updatedAt`) VALUES
(1, 'Rhythm Ride', 'High-intensity indoor cycling with synchronized music and choreography for full-body engagement.', 45, '/uploads/admin/class_types/classtype-1762855524076-691468704.jpg', 1, '2025-11-11 10:05:24', '2025-11-11 10:41:20'),
(5, 'Power Cycle', 'An advanced cycling session designed to improve strength and stamina through high-resistance intervals and speed drills.', 60, '/uploads/admin/class_types/classtype-1762858125167-682109211.jpeg', 0, '2025-11-11 10:48:45', '2025-11-11 10:48:45'),
(6, 'Zen Flow Yoga', 'A calming blend of yoga and meditation that enhances flexibility, balance, and mindfulness in a peaceful environment', 66, '/uploads/admin/class_types/classtype-1762858181691-802078115.jpeg', 1, '2025-11-11 10:49:41', '2025-11-11 10:49:41'),
(7, 'Beat Spin', 'A rhythm-driven cycling experience where music sets the pace. Expect sweat, speed, and synchronized pedaling.', 55, '/uploads/admin/class_types/classtype-1762858207984-542069198.jpeg', 1, '2025-11-11 10:50:07', '2025-11-11 10:51:13'),
(8, 'Endurance Challenge', 'Push your limits with this endurance cycling session focused on long, steady intervals and mental toughness.', 555, '/uploads/admin/class_types/classtype-1762858207984-542069198.jpeg', 1, '2025-11-11 10:50:33', '2025-12-11 14:06:23');

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `experience_years` int(11) DEFAULT NULL,
  `service_id` int(11) NOT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT 0.00,
  `phone` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`id`, `first_name`, `last_name`, `email`, `password_hash`, `bio`, `experience_years`, `service_id`, `specialization`, `rating`, `phone`, `image`, `status`, `createdAt`, `updatedAt`) VALUES
(18, 'Rahul', 'Sharma', 'rahul.sharma@rhythmride.com', '', 'Certified fitness instructor with over 6 years of experience in yoga, strength training, and wellness coaching. Passionate about helping clients achieve a balanced and healthy lifestyle.\r\n', 6, 5, 'Power Cycle', 4.50, '9876543210', 'instructor-1765880876641-190467880.png', 'active', '2025-12-16 10:27:56', '2025-12-16 10:31:53'),
(19, 'Alice', 'Johnson', 'alice.johnson@example.com', '', 'Bio as ', 8, 8, 'Endurance Challenge', 4.80, '1234567890', 'instructor-1765881316425-417911741.png', 'active', '2025-12-16 10:35:16', '2025-12-16 10:35:16'),
(20, 'Alex', 'Turner', 'alex.turner@gymfit.com', '', 'Certified personal trainer specializing in strength training and bodybuilding.', 7, 8, 'Endurance Challenge', 4.00, '1234567890', 'instructor-1765881407754-364268284.png', 'active', '2025-12-16 10:36:47', '2025-12-16 10:36:47'),
(21, 'Bella', 'Morris', 'bella.morris@gymfit.com', '', 'Yoga and Pilates instructor helping clients improve flexibility and mindfulness.', 6, 6, 'Zen Flow Yoga', 4.00, '1987654321', 'instructor-1765881467088-391152182.png', 'active', '2025-12-16 10:37:47', '2025-12-16 10:37:47'),
(22, 'Chris', 'Evans', 'chris.evans@gymfit.com', '', 'Functional fitness coach focused on mobility, endurance, and overall health.', 5, 5, 'Power Cycle', 3.00, '1122334455', 'instructor-1765881518456-798374290.png', 'active', '2025-12-16 10:38:38', '2025-12-16 10:38:38');

-- --------------------------------------------------------

--
-- Table structure for table `shortvideos`
--

CREATE TABLE `shortvideos` (
  `id` int(11) NOT NULL,
  `video` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `service_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shortvideos`
--

INSERT INTO `shortvideos` (`id`, `video`, `thumbnail`, `status`, `service_id`, `createdAt`, `updatedAt`) VALUES
(3, '/uploads/admin/short_video/videos/video-1765887091207-598349294.mp4', '/uploads/admin/short_video/thumbnails/thumb-1765887091479-604058396.png', 'active', 8, '2025-12-16 12:11:31', '2025-12-16 12:11:31'),
(6, '/uploads/admin/short_video/videos/video-1765887295358-178450273.mp4', '/uploads/admin/short_video/thumbnails/thumb-1765887295525-448593975.png', 'inactive', 8, '2025-12-16 12:14:55', '2025-12-16 12:14:55'),
(7, '/uploads/admin/short_video/videos/video-1765887407921-649070572.mp4', '/uploads/admin/short_video/thumbnails/thumb-1765887409142-377537627.jpg', 'active', 6, '2025-12-16 12:16:49', '2025-12-16 12:24:02'),
(8, '/uploads/admin/short_video/videos/video-1765887460984-129831300.mp4', '/uploads/admin/short_video/thumbnails/thumb-1765887461447-831447142.jpg', 'active', 1, '2025-12-16 12:17:41', '2025-12-16 12:23:55'),
(9, '/uploads/admin/short_video/videos/video-1765893342788-776289672.mp4', '/uploads/admin/short_video/thumbnails/thumb-1765893343278-25968706.png', 'active', 8, '2025-12-16 13:55:43', '2025-12-16 13:55:43'),
(10, '/uploads/admin/short_video/videos/video-1765893361328-699758703.mp4', '/uploads/admin/short_video/thumbnails/thumb-1765893363133-835844919.png', 'active', 7, '2025-12-16 13:56:03', '2025-12-16 13:56:03'),
(11, '/uploads/admin/short_video/videos/video-1765893418057-194498222.mp4', '/uploads/admin/short_video/thumbnails/thumb-1765893418367-326001968.png', 'active', 7, '2025-12-16 13:56:58', '2025-12-16 13:56:58'),
(12, '/uploads/admin/short_video/videos/video-1765893437859-975834442.mp4', '/uploads/admin/short_video/thumbnails/thumb-1765893438494-496465783.png', 'active', NULL, '2025-12-16 13:57:18', '2025-12-16 13:57:18'),
(13, '/uploads/admin/short_video/videos/video-1765893454364-206481540.mp4', '/uploads/admin/short_video/thumbnails/thumb-1765893454631-204047740.png', 'active', NULL, '2025-12-16 13:57:34', '2025-12-16 13:57:34'),
(14, '/uploads/admin/short_video/videos/video-1765893473243-439081244.mp4', '/uploads/admin/short_video/thumbnails/thumb-1765893474917-822507929.png', 'active', NULL, '2025-12-16 13:57:54', '2025-12-16 13:57:54'),
(15, '/uploads/admin/short_video/videos/video-1765893507759-457400661.mp4', '/uploads/admin/short_video/thumbnails/thumb-1765893508212-867621121.png', 'active', NULL, '2025-12-16 13:58:28', '2025-12-16 13:58:28');

-- --------------------------------------------------------

--
-- Table structure for table `studios`
--

CREATE TABLE `studios` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,6) DEFAULT NULL,
  `longitude` decimal(10,6) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studios`
--

INSERT INTO `studios` (`id`, `name`, `address`, `city`, `state`, `country`, `latitude`, `longitude`, `phone`, `email`, `active`, `created_at`, `updated_at`) VALUES
(5, 'Rhythm Ride Studio - Downtown', '12th Avenue, Block C, New York City', 'New York', 'New York', 'USA', 40.561856, -73.914093, '2125559012', 'downtown@rhythmride.com', 1, '2025-11-10 09:58:47', '2025-11-10 09:58:47'),
(6, 'Rhythm Ride Studio - Brooklyn', '45 Berry St, Williamsburg', 'Brooklyn', 'New York', 'USA', 40.720914, -73.956557, '2125553344', 'brooklyn@rhythmride.com', 1, '2025-11-10 10:00:13', '2025-11-10 10:00:13'),
(7, 'Rhythm Ride Studio - San Francisco', '201 Market St, San Francisco', 'San Francisco', 'California', 'USA', 37.793180, -122.396441, '4155557812', 'sf@rhythmride.com', 1, '2025-11-10 10:00:43', '2025-11-10 10:00:43'),
(8, 'Rhythm Ride Studio - Los Angeles', 'Beverly Blvd, West Hollywood', 'Los Angeles', 'California', 'USA', 34.076829, -118.380355, '3105556677', 'la@rhythmride.com', 1, '2025-11-10 10:01:15', '2025-11-10 10:01:15'),
(9, 'Rhythm Ride Studio - Chicago', '234 W Ontario St, River North', 'Chicago', 'Illinois', 'USA', 41.893169, -87.635445, '7735559912', 'chicago@rhythmride.com', 1, '2025-11-10 10:01:42', '2025-11-10 10:01:42'),
(10, 'Admin Ansh', 'Kolkata', 'Qala i Naw', 'West Bengal', 'Afghanistan', 34.987350, 63.128910, '4544332357', 'admin8@example.com', 1, '2025-11-10 12:51:09', '2025-11-10 12:51:09');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `role`, `status`, `description`, `image`, `createdAt`, `updatedAt`) VALUES
(2, 'Alice Johnson', 'Yoga Enthusiast', 1, 'Joining this yoga program has transformed my mornings! I feel more energetic and balanced.', 'testimonial-1764751963988-910315.jpg', '2025-12-03 08:52:43', '2025-12-03 08:52:43'),
(3, 'Rahul Sharma', 'Fitness Coach', 1, 'The instructors are very professional and the sessions are easy to follow. Highly recommend!', 'testimonial-1764751994118-168130.jpg', '2025-12-03 08:53:14', '2025-12-03 08:53:14'),
(4, 'Sophie Lee', 'Student', 1, 'I love the variety of classes offered. It keeps me motivated every week.', 'testimonial-1764752029530-46458.jpg', '2025-12-03 08:53:49', '2025-12-03 08:53:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `address_1` text DEFAULT NULL,
  `address_2` text DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `shoe_size` int(11) DEFAULT 0,
  `status` enum('active','inactive','banned') DEFAULT 'active',
  `latitude` decimal(10,6) DEFAULT NULL,
  `longitude` decimal(10,6) DEFAULT NULL,
  `terms_and_conditions` tinyint(1) DEFAULT 0,
  `expiry_email_notification` tinyint(1) DEFAULT 0,
  `upcoming_booking_email_notification` tinyint(1) DEFAULT 0,
  `referral_code` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `phone`, `password_hash`, `gender`, `dob`, `address_1`, `address_2`, `city`, `state`, `country`, `zip_code`, `profile_image`, `shoe_size`, `status`, `latitude`, `longitude`, `terms_and_conditions`, `expiry_email_notification`, `upcoming_booking_email_notification`, `referral_code`, `createdAt`, `updatedAt`) VALUES
(19, 'Anshuman', 'Majumder', 'o2zonereception@gmail.com', '613433433321', '$2a$10$XhshCBrTsWKmEG7IU.wrDO23eQXwRcR8tpjd1EifcM0YmO6Ydl7nS', NULL, '2008-03-18', NULL, NULL, 'Kolkata', 'West Bengal', 'Afghanistan', '34424', NULL, 0, 'active', 34.159326, 66.515510, 0, 0, 0, 'RR-U96675', '2025-12-10 12:36:58', '2025-12-10 12:36:58'),
(22, 'Anshuman ', 'Majumder', 'user1@gmail.com', '611234567890', '$2b$10$9lVnGBtpz..5v9X6A6z/vunLHDVwAwWd9Pq8dGdy7Mbs2miauwTVy', NULL, '2001-12-13', NULL, NULL, 'Kolkata', 'West Bengal', 'India', '700092', NULL, 0, 'active', 22.482808, 88.350346, 0, 0, 0, 'RR-XMSDF3', '2025-12-16 06:45:37', '2025-12-16 06:45:37'),
(23, 'Ansh', 'Test', 'user2@gmail.com', '611233232232', '$2b$10$jU2YXiz3OTBUH/M76l4PjOut3nhT7u6UbT1nIxHh4CpMu7qigmYLq', NULL, '2008-12-15', NULL, NULL, 'Qala i Naw', 'California', 'Afghanistan', '34424', NULL, 0, 'active', 34.159326, 66.515510, 0, 0, 0, 'RR-M3YBCL', '2025-12-16 07:27:02', '2025-12-16 07:27:02'),
(24, 'Anshuman ', 'Majumder', 'anshumanmr2001@gmail.com', '919330613955', '$2b$10$JyZKS2ksPiiwJf1Mcqm.8.W0dJNU.PgK17fm0J7RjzGDPfttTmGgW', NULL, '2001-12-13', NULL, NULL, 'Kolkata', 'West Bengal', 'India', '700092', NULL, 0, 'active', 22.482808, 88.350346, 0, 0, 0, 'RR-61338H', '2025-12-17 06:28:04', '2025-12-17 06:28:04'),
(26, 'USername', 'lastname', 'anshumanmr2000@gmail.com', '619099898876', '$2b$10$leqNimLny7ZvxYmnHeOrYOo2hU/dc7IMAjjZl4IZPtrq6b52ZrUZ2', NULL, '2006-12-18', NULL, NULL, 'Qala i Naw', 'New York', 'Afghanistan', '34424', NULL, 0, 'active', 34.159326, 66.515510, 0, 0, 0, 'RR-9TKMYP', '2025-12-17 06:43:21', '2025-12-17 06:43:21'),
(27, 'User2', 'Test', 'user3@gmail.com', '617677676675', '$2b$10$6SGiIoW75UijcbJlJzafEOUhOsjES14kYQPc3kqG0pfKYbBtf/m.y', NULL, '2007-12-15', NULL, NULL, 'Qala i Naw', 'West Bengal', 'Afghanistan', '34424', NULL, 0, 'active', 34.159326, 66.515510, 0, 0, 0, 'RR-YQBM8Z', '2025-12-17 06:46:55', '2025-12-17 06:46:55'),
(28, 'usetest', 'usetest', 'user4@gmail.com', '610988987767', '$2b$10$zIgi9w97rCEXxekJvXQHmOuJQ1ME3buPr7NHcc6nUAFCvhzrS0FRW', NULL, '2001-12-13', NULL, NULL, 'Qala i Naw', 'New York', 'Afghanistan', '34424', NULL, 0, 'active', 34.159326, 66.515510, 0, 0, 0, 'RR-AWAOGY', '2025-12-17 06:55:43', '2025-12-17 06:55:43'),
(30, 'John', 'Doe', 'user@example.com', '1234567890', '$2b$10$aVsk59ZbtCSrPqSsngUGBuWxw/96foqcuVO5Lo6Eqny4NhJZbLuay', NULL, '1990-01-01', NULL, NULL, 'New York', 'New York', 'USA', '12345', NULL, 0, 'active', 42.709445, -73.394652, 0, 0, 0, 'RR-ZIO3XL', '2025-12-17 07:01:35', '2025-12-17 07:01:35');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `instructor_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `video` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `duration` float DEFAULT NULL,
  `size` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `title`, `description`, `instructor_id`, `class_id`, `video`, `thumbnail`, `duration`, `size`, `createdAt`, `updatedAt`) VALUES
(1, 'Beginner Yoga Flow', 'This session focuses on gentle stretching, breath control, and basic yoga postures suitable for beginners. Relax, breathe, and follow along.', 6, 1, '/uploads/admin/video_files/video-1764673794867.mp4', '/uploads/admin/video_thumbnails/thumbnail-1764673795095.jpg', 14, 13, '2025-12-02 11:09:55', '2025-12-02 11:09:55'),
(2, 'Yoga for Flexibility', 'This session focuses on improving flexibility in the hips, hamstrings, and spine. Take it slow, breathe deeply, and allow your body to open', 6, 1, '/uploads/admin/video_files/video-1764674191730.mp4', '/uploads/admin/video_thumbnails/thumbnail-1764674192087.jpg', 8, 24, '2025-12-02 11:16:32', '2025-12-02 11:16:32'),
(3, 'Beginner Sun Salutation (Surya Namaskar)', 'A step-by-step guide to learning the Sun Salutation sequence. Ideal for beginners wanting to build strength, coordination, and balance', 6, 1, '/uploads/admin/video_files/video-1764674393089.mp4', '/uploads/admin/video_thumbnails/thumbnail-1764674393240.jpg', 14, 13, '2025-12-02 11:19:53', '2025-12-02 11:19:53'),
(4, 'Introduction to Endurance Training', 'Learn the fundamentals of endurance training, how it improves stamina, cardiovascular health, and overall performance. Perfect starting point for beginners.', 8, 5, '/uploads/admin/video_files/video-1764674656705.mp4', '/uploads/admin/video_thumbnails/thumbnail-1764674657188.jpg', 24, 73, '2025-12-02 11:24:17', '2025-12-02 11:24:17'),
(5, 'Low-Intensity Steady State (LISS) Warm-Up', 'A gentle warm-up designed to increase heart rate gradually and prepare the body for longer endurance exercises.', 8, 5, '/uploads/admin/video_files/video-1764674788252.mp4', '/uploads/admin/video_thumbnails/thumbnail-1764674788715.jpg', 24, 73, '2025-12-02 11:26:29', '2025-12-02 11:26:29'),
(6, 'Beginner Running Endurance Session', 'This session helps build running endurance using slow, controlled pacing and interval timing. No experience required — just follow along.', 8, 5, '/uploads/admin/video_files/video-1764674842367.mp4', '/uploads/admin/video_thumbnails/thumbnail-1764674842423.jpg', 6, 8, '2025-12-02 11:27:22', '2025-12-02 11:27:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_sessions`
--
ALTER TABLE `class_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_type_id` (`class_type_id`),
  ADD KEY `instructor_id` (`instructor_id`),
  ADD KEY `studio_id` (`studio_id`);

--
-- Indexes for table `class_type`
--
ALTER TABLE `class_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `shortvideos`
--
ALTER TABLE `shortvideos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `studios`
--
ALTER TABLE `studios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `studios_email_unique` (`email`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `referral_code` (`referral_code`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instructor_id` (`instructor_id`),
  ADD KEY `class_id` (`class_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `class_sessions`
--
ALTER TABLE `class_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `class_type`
--
ALTER TABLE `class_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `instructors`
--
ALTER TABLE `instructors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `shortvideos`
--
ALTER TABLE `shortvideos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `studios`
--
ALTER TABLE `studios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `class_sessions`
--
ALTER TABLE `class_sessions`
  ADD CONSTRAINT `class_sessions_ibfk_1` FOREIGN KEY (`class_type_id`) REFERENCES `class_type` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `class_sessions_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `instructors` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `class_sessions_ibfk_3` FOREIGN KEY (`studio_id`) REFERENCES `studios` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `shortvideos`
--
ALTER TABLE `shortvideos`
  ADD CONSTRAINT `shortvideos_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `class_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `instructors` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `videos_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `class_type` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
