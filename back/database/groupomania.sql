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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (2,161,61,'je teste un commentaire','2024-03-23 22:10:39','2024-03-23 22:10:49'),(3,166,45,'je teste un commentaire','2024-03-23 22:10:39','2024-03-23 22:10:49'),(5,164,59,'je teste encore un commentaire','2024-03-23 22:10:39','2024-03-23 22:10:49'),(6,165,63,'et encore un commentaire','2024-03-23 22:10:39','2024-03-23 22:10:49'),(7,166,45,'allé hop on y va !','2024-03-23 22:10:39','2024-03-23 22:10:49'),(8,165,59,'enccore un test','2024-06-10 11:31:06','2024-06-10 11:31:06'),(10,163,61,'ou bien c\'est comme une boîte de chocolat ^^','2024-06-10 11:32:39','2024-06-10 11:32:39'),(13,166,42,'Cool ça marche','2024-06-11 11:34:37','2024-06-11 11:34:37'),(15,163,42,'Ca n\'a pas l\'air de marcher si bien que ça','2024-06-11 14:49:07','2024-06-11 14:49:07'),(22,166,62,'est-ce qu\'il saiiiiiit faire une toile ? Biensur que non, c\'est un cochon','2024-06-13 14:57:54','2024-06-13 14:57:54'),(23,166,61,'kamoulox','2024-06-13 14:58:24','2024-06-13 14:58:24'),(24,166,60,'Hou pinaise mais y a pas d\'sable ???','2024-06-13 14:58:53','2024-06-13 14:58:53'),(25,167,63,'Je s\'appelle Groot !','2024-06-13 15:16:06','2024-06-13 15:16:06'),(26,167,46,'Je s\'appelle Groot !','2024-06-13 15:17:10','2024-06-13 15:17:10'),(27,161,76,'enchanté','2024-08-23 09:35:43','2024-08-23 09:35:43'),(33,161,92,'N\'hésitez pas à partager les vôtres','2024-10-09 21:27:07','2024-10-09 21:27:07');
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
  `video` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (42,161,'C\'est le cinquième cette année ...','http://localhost:5000/images/skate_lwz1lt5c.png',NULL,'2024-03-23 22:03:55','2024-03-23 22:04:04'),(45,164,'\"La vie, c\'est comme une bicyclette, il faut avancer pour ne pas perdre l\'équilibre.\"',NULL,NULL,'2024-04-25 00:07:37','2024-04-25 00:07:37'),(46,165,'La journée s\'annonce bien :)','http://localhost:5000/images/barbecue_lwz1b6yg.png',NULL,'2024-04-25 00:08:36','2024-04-25 00:08:36'),(59,166,'Un de mes meilleurs rêves à ce jour!','http://localhost:5000/images/reve_d\'homer_lx6d83dj.png',NULL,'2024-06-03 01:12:40','2024-06-03 01:12:40'),(60,163,'Un petit aperçu de mes vacances !','http://localhost:5000/images/vacances_lwyb500c.jpg',NULL,'2024-06-03 01:43:59','2024-06-03 01:43:59'),(61,161,'Voici mon futur bébé :)','http://localhost:5000/images/ferrari-f90_lwz0e4w6.jpg',NULL,'2024-06-03 13:30:56','2024-06-03 13:30:56'),(62,166,'Spidercochon Spidercochon, il sait marcher au plafond ^^','http://localhost:5000/images/spidercochon_lwz17s8s.png',NULL,'2024-06-03 13:45:40','2024-06-03 13:45:40'),(63,163,'Le son du moment à ne pas louper',NULL,'https://www.youtube.com/embed/57VMB1IzLKY?','2024-06-03 23:52:42','2024-06-03 23:52:42'),(76,167,'Je s\'appelle Groot !',NULL,NULL,'2024-06-13 15:13:35','2024-06-13 15:13:35'),(92,161,'L\'été me manque déjà, en attendant voici une petite photo souvenir','http://localhost:5000/images/maldives_m22dqf07.jpg',NULL,'2024-10-09 21:26:14','2024-10-09 21:26:14');
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
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_admin` tinyint(1) DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (161,'bob','bob@bob.fr','$2b$10$YjZNQ7Uvp8ni3WmTDFF44OaGKUq0Ufq3oQnHTbr8OTY0h.rJAxrHG','Bonjour, moi c\'est Bob','http://localhost:5000/images/Avatar_m1behkqe.png',1,1,'2024-04-16 22:46:41','2024-04-16 22:46:41'),(163,'john','john@bob.fr','$2b$10$aVxuS09AntoTLBR6uwEYq.nB9MQm2LFsYNbvpFSz/kWa2oe5QuJv2','Salut moi c\'est John','http://localhost:5000/images/ava2_lwy8tifq.png',1,0,'2024-04-28 00:47:12','2024-04-28 00:47:12'),(164,'marise','marise@bob.fr','$2b$10$G3tg01cO0RXPfbe6cA2wJ.2TcF8jjrCEj9Gw.xpflaM0y6xnmIYba','Bonjour je m\'appelle Marise','http://localhost:5000/images/ava4_lwy8z7bx.png',1,0,'2024-06-03 00:42:45','2024-06-03 00:42:45'),(165,'robert','robert@bob.fr','$2b$10$SY9QjQn8icGXUAGcC5ObHO19oNeJzawAMcuCDJKr3W0crytTTz0ti','Salut moi c\'est robert le moustachu','http://localhost:5000/images/ava3_lwy91da2.png',1,0,'2024-06-03 00:44:37','2024-06-03 00:44:37'),(166,'homer','homer@bob.fr','$2b$10$unhmkCBWgElvEwX9DojHQeR0UBAnzZ5cHbi.8VT61ZiK/2yPS1sG2','Hou punaise!!!','http://localhost:5000/images/Homer_lwya1v4z.png',1,0,'2024-06-03 01:07:03','2024-06-03 01:07:03'),(167,'groot','groot@bob.fr','$2b$10$7tm5u./dnrfYVrt5sObbjeQ8hJ5sCDDyXfMToSVIpcmheyyf.kwD2','Je s\'appelle Groot !','http://localhost:5000/images/Groot_lxdefhc6.png',1,0,'2024-06-13 15:10:01','2024-06-13 15:10:01'),(173,'pouet','pouet@bob.fr','$2b$10$8VMMmQ07UF1CyF.gLpkxsuJFG2wNEBOI1pc4tcZvS9BqF9tVY2uFK','test123','http://localhost:5000/images/icon_m1bai1k1.png',1,0,'2024-09-17 22:30:12','2024-09-17 22:30:12');
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

-- Dump completed on 2024-10-10  1:53:28
