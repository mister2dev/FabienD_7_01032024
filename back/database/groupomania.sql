-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `content` text NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (2,456326115,46546,'je teste un commentaire','2024-03-23 22:10:39','2024-03-23 22:10:49'),(3,456326115,46546,'je teste un commentaire','2024-03-23 22:10:39','2024-03-23 22:10:49'),(5,451746115,452546,'je teste encore un commentaire','2024-03-23 22:10:39','2024-03-23 22:10:49'),(6,451745615,452546,'et encore un commentaire','2024-03-23 22:10:39','2024-03-23 22:10:49'),(7,5464654,5498754,'allé hop on y va !','2024-03-23 22:10:39','2024-03-23 22:10:49');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (42,546132,'encore une fois','http://localhost:5000/images/20130825101716-fc83bb3d.jpg1711023642064.jpg','2024-03-23 22:03:55','2024-03-23 22:04:04'),(44,5464654,'allé hop on y va !',NULL,'2024-03-23 22:03:55','2024-03-23 22:04:04');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_admin` tinyint(1) DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8,'juju','jujudu59@gmail.com','$2b$10$fs/EblFT1tZ/93HWp.eyNuGvP4UmiSh9tALtxtVroBaJdZXU1AxhS',NULL,NULL,0,'2024-03-23 21:39:34','2024-03-23 21:40:12'),(10,'juju','jujudu593@gmail.com','$2b$10$ksTmCgfwDcYvmFjHUCuKVODY4eYH2vHLQg6jDbFq2sdRtCdAa4BBu',NULL,NULL,0,'2024-03-23 21:39:34','2024-03-23 21:40:12'),(14,'bobmoran','bobmoran2226@gmail.com','$2b$10$xAy6S1s.f1udraSwY3HtLe4sKucwuiBPpLD0SEoILosMVv7aaslCq',NULL,NULL,0,'2024-03-23 21:39:34','2024-03-23 21:40:12'),(16,'booba4','booba4@gmail.com','$2b$10$ukZschnqsoNVQsRFqQBbb.CiJcN1v3iVeleA8cyUpSw2Ih5QMJk5G',NULL,NULL,0,'2024-03-23 21:39:34','2024-03-23 21:40:12'),(17,'jeanclaude','jeanclaude@msn.com','$2b$10$c7FN4BWrsUgCpGmrnpxOP.JuaIgYmiMhD26SskqN5JpsP9H4.ethO',NULL,NULL,0,'2024-03-23 21:39:34','2024-03-23 21:40:12'),(19,'bob','bob123@gmail.com','$2b$10$R6AgyFWTHG/yie2uEAKIBeSwtx.kHxI/irw85lT98kc5XfJZj1aXK',NULL,NULL,0,'2024-03-23 21:39:34','2024-03-23 21:40:12'),(22,'bobmoran','bobmoran22@gmail.com','$2b$10$9H/sd326uHqe0LNkAA.ooe9UfHDEBez7TAVHssXoXZ60OFzGa/UNy',NULL,NULL,0,'2024-03-23 21:39:34','2024-03-23 21:40:12'),(24,'boblafrite','boblafrite24@gmail.com','$2b$10$4hxqN2omxsI7cLXzuKe9POePBcdxrLIkeUlPwUGeR08cuqm9EH6iy',NULL,NULL,0,'2024-03-23 21:39:34','2024-03-23 21:40:12'),(25,'johnlenon','johnlenon@gmail.com','$2b$10$kVW1uqN5jy6a2JIMMYr.2OV3c80bdw7TnvKs2K73IJs7wSBhSwGjS',NULL,NULL,0,'2024-03-23 21:39:34','2024-03-23 21:40:12'),(26,'johnlenon123','johnlenon1238@gmail.com','$2b$10$trbjJY9bjK7E0o7NRpathu/XNxi8l5Psh6vtyDtLdn50OR7V9yjYi',NULL,0,0,'2024-03-23 23:48:07','2024-03-23 23:48:07'),(29,'johnlenon123','johnlenon1234@gmail.com','$2b$10$DEHG6FlslNS.K/sjHkr0nuMpZWNnoszwUHgUoeXELN3lBHjx17Uu.',NULL,1,0,'2024-03-23 23:49:28','2024-03-23 23:49:28'),(30,'john','john@gmail.com','$2b$10$5sQrmu5/w9WYKGWI.XOfneNy.mr9kmlMiO0KNglXOoLg26C3e1Iti',NULL,0,0,'2024-03-24 00:57:20','2024-03-24 00:57:20'),(31,'john2','john2@gmail.com','$2b$10$0zgtIy6i1k8kgUWo6dchgeI8r6JMVMz4LcODnZnFZZdWdGtYZRMry',NULL,1,0,'2024-03-24 00:57:51','2024-03-24 00:57:51');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-24  3:10:49
