CREATE DATABASE  IF NOT EXISTS `reddit` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `reddit`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: reddit
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `text` varchar(100) NOT NULL,
  `post_id` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `comment_id_UNIQUE` (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES ('0fe60fbd-d683-4db6-8528-bbac66aa21e8','anirudh.software@gmail.com','hi','703340ed-8161-418e-8e13-6d4971ac3098','2025-10-02 09:14:48'),('201bf705-0732-40e9-bcde-b1817106df36','anirudh.software@gmail.com','ds','d59c6ef2-0137-4c3b-a9f2-a5b8c9da8f10','2025-10-02 09:16:30'),('3a0cdb32-962e-46cb-8a0c-2dbf70f5f509','anirudh.software@gmail.com','hi','703340ed-8161-418e-8e13-6d4971ac3098','2025-10-02 09:15:38'),('70b89fec-a3ac-430c-86e8-d1c99ec9e181','Anirudh','gg','d59c6ef2-0137-4c3b-a9f2-a5b8c9da8f10','2025-09-29 17:07:03'),('72c37252-0ea1-4e2b-b2cd-69c1569660c7','Anirudh','ss','d59c6ef2-0137-4c3b-a9f2-a5b8c9da8f10','2025-09-29 20:34:50'),('ea0f2624-8710-43a5-946f-130954ff994c','Anirudh','gg','d59c6ef2-0137-4c3b-a9f2-a5b8c9da8f10','2025-09-29 17:06:01');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` varchar(100) NOT NULL,
  `post_name` varchar(45) NOT NULL,
  `url` varchar(100) NOT NULL,
  `description` longtext,
  `username` varchar(45) NOT NULL,
  `subreddit_id` varchar(100) NOT NULL,
  `created_date` datetime NOT NULL,
  `vote_count` int DEFAULT '0',
  `comment_count` int DEFAULT '0',
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id_UNIQUE` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES ('703340ed-8161-418e-8e13-6d4971ac3098','sample post','','<p>He</p>','anirudh.software@gmail.com','900fa279-b0bd-4a57-89ed-259efe098d7d','2025-10-01 09:35:56',0,2),('9adf2e9e-fd7a-4c58-9023-d19cc7ef7f1a','Check AI','','Yesterday I went to school, had a productive day attending various classes. Upon returning home, I engaged in a relaxing evening, watching a film. Regarding lunch, I had a delightful catered meeting with the board to discuss Q3 projections. We enjoyed a selection of artisanal sandwiches and a fresh garden salad while reviewing the impressive quarterly gains. It was a collaborative and insightful afternoon.','Anirudh','900fa279-b0bd-4a57-89ed-259efe098d7d','2025-10-04 10:35:57',0,0),('d39c5598-9812-43bd-a62e-b55540e571b4','ceg','','<p>dfs</p>','Anirudh','900fa279-b0bd-4a57-89ed-259efe098d7d','2025-10-04 09:39:05',0,0),('d59c6ef2-0137-4c3b-a9f2-a5b8c9da8f10','asd','','<p>sdf</p>','Anirudh','900fa279-b0bd-4a57-89ed-259efe098d7d','2025-09-29 15:19:44',1,2);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `token` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`token`),
  UNIQUE KEY `token_UNIQUE` (`token`),
  UNIQUE KEY `username_UNIQUE` (`created_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
INSERT INTO `refresh_token` VALUES ('8908a091-9baa-453b-80e8-5c4904440134','2025-10-01 09:42:04'),('4606e999-5c4e-4499-8972-163ef319eeb7','2025-10-02 10:26:41');
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subreddit`
--

DROP TABLE IF EXISTS `subreddit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subreddit` (
  `subreddit_id` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `subreddit_name` varchar(45) NOT NULL,
  `number_of_posts` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`subreddit_id`),
  UNIQUE KEY `subreddit_id_UNIQUE` (`subreddit_id`),
  UNIQUE KEY `subreddit_name_UNIQUE` (`subreddit_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subreddit`
--

LOCK TABLES `subreddit` WRITE;
/*!40000 ALTER TABLE `subreddit` DISABLE KEYS */;
INSERT INTO `subreddit` VALUES ('900fa279-b0bd-4a57-89ed-259efe098d7d','This subreddit deals with automobile posts','Automobiles',0);
/*!40000 ALTER TABLE `subreddit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `created` datetime DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `enabled` tinyint DEFAULT NULL,
  `password` varchar(1000) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2025-09-29 11:04:36','anijodha@gmail.com',1,'Password@123','Anirudh');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_token`
--

DROP TABLE IF EXISTS `verification_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_token` (
  `email` varchar(50) NOT NULL,
  `token` varchar(100) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `token_UNIQUE` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_token`
--

LOCK TABLES `verification_token` WRITE;
/*!40000 ALTER TABLE `verification_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `verification_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote` (
  `entry_id` varchar(50) NOT NULL,
  `username` varchar(45) NOT NULL,
  `vote_type` int NOT NULL,
  PRIMARY KEY (`username`,`entry_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
INSERT INTO `vote` VALUES ('d59c6ef2-0137-4c3b-a9f2-a5b8c9da8f10','ABC',0);
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-04 10:36:42
