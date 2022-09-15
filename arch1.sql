-- MySQL dump 10.18  Distrib 10.3.27-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: archive
-- ------------------------------------------------------
-- Server version	10.3.27-MariaDB-0+deb10u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `designation` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_designation_unique` (`designation`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (41,'categorie 1','2020-12-21 21:33:11','2021-05-12 15:25:01'),(43,'categprie 3','2020-12-21 21:35:11','2020-12-21 21:35:11'),(44,'categorie 4','2020-12-21 21:36:05','2020-12-21 21:36:05'),(45,'categorie 5','2020-12-21 21:36:33','2020-12-21 21:36:33'),(46,'categorie 6','2020-12-21 21:37:02','2020-12-21 21:37:02');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_groupes`
--

DROP TABLE IF EXISTS `category_groupes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_groupes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `groupe_id` bigint(20) unsigned NOT NULL,
  `categorie_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_groupes_groupe_id_foreign` (`groupe_id`),
  KEY `category_groupes_categorie_id_foreign` (`categorie_id`),
  CONSTRAINT `category_groupes_categorie_id_foreign` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `category_groupes_groupe_id_foreign` FOREIGN KEY (`groupe_id`) REFERENCES `groupes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_groupes`
--

LOCK TABLES `category_groupes` WRITE;
/*!40000 ALTER TABLE `category_groupes` DISABLE KEYS */;
INSERT INTO `category_groupes` VALUES (47,4,43,'2020-12-21 21:35:11','2020-12-21 21:35:11'),(52,4,46,'2020-12-21 21:37:02','2020-12-21 21:37:02'),(53,1,46,'2020-12-21 21:37:02','2020-12-21 21:37:02'),(63,1,45,'2020-12-21 21:42:04','2020-12-21 21:42:04'),(64,4,45,'2020-12-21 21:42:04','2020-12-21 21:42:04'),(65,4,44,'2020-12-21 21:48:16','2020-12-21 21:48:16'),(66,5,44,'2020-12-21 21:48:16','2020-12-21 21:48:16'),(70,5,41,'2021-05-12 15:25:01','2021-05-12 15:25:01'),(71,4,41,'2021-05-12 15:25:01','2021-05-12 15:25:01'),(72,1,41,'2021-05-12 15:25:01','2021-05-12 15:25:01');
/*!40000 ALTER TABLE `category_groupes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dossier_to_deletes`
--

DROP TABLE IF EXISTS `dossier_to_deletes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dossier_to_deletes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dossier_to_deletes`
--

LOCK TABLES `dossier_to_deletes` WRITE;
/*!40000 ALTER TABLE `dossier_to_deletes` DISABLE KEYS */;
/*!40000 ALTER TABLE `dossier_to_deletes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dossiers`
--

DROP TABLE IF EXISTS `dossiers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dossiers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numeroDossier` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categorie_id` bigint(20) unsigned NOT NULL,
  `createdBy` bigint(20) unsigned NOT NULL,
  `deletedBy` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dossiers_nom_unique` (`nom`),
  UNIQUE KEY `dossiers_numerodossier_unique` (`numeroDossier`),
  KEY `dossiers_categorie_id_foreign` (`categorie_id`),
  KEY `dossiers_createdby_foreign` (`createdBy`),
  KEY `dossiers_deletedby_foreign` (`deletedBy`),
  CONSTRAINT `dossiers_categorie_id_foreign` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `dossiers_createdby_foreign` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`),
  CONSTRAINT `dossiers_deletedby_foreign` FOREIGN KEY (`deletedBy`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dossiers`
--

LOCK TABLES `dossiers` WRITE;
/*!40000 ALTER TABLE `dossiers` DISABLE KEYS */;
INSERT INTO `dossiers` VALUES (7,'facture janvier','Fld-14-05-21_n°1',41,16,NULL,'2021-05-14 14:33:00','2021-05-14 14:33:00',NULL),(8,'facture fevrier','Fld-14-05-21_n°8',43,16,16,'2021-05-14 14:33:45','2021-05-15 12:12:47',NULL),(9,'facture mars','Fld-15-05-21_n°9',44,16,NULL,'2021-05-15 10:21:23','2021-05-15 10:21:23',NULL);
/*!40000 ALTER TABLE `dossiers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupes`
--

DROP TABLE IF EXISTS `groupes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groupes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `designation` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `groupes_designation_unique` (`designation`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupes`
--

LOCK TABLES `groupes` WRITE;
/*!40000 ALTER TABLE `groupes` DISABLE KEYS */;
INSERT INTO `groupes` VALUES (1,'groupe 1','2020-12-10 19:11:48','2020-12-11 10:27:47'),(4,'groupe4','2020-12-11 10:13:26','2020-12-11 10:13:26'),(5,'groupe 5','2020-12-11 10:27:25','2020-12-11 10:27:25'),(6,'groupe zero','2021-04-26 16:24:39','2021-04-26 16:24:39');
/*!40000 ALTER TABLE `groupes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` tinyint(1) DEFAULT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `from_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_user_id_foreign` (`user_id`),
  KEY `messages_from_id_foreign` (`from_id`),
  CONSTRAINT `messages_from_id_foreign` FOREIGN KEY (`from_id`) REFERENCES `users` (`id`),
  CONSTRAINT `messages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'qqqqqq',1,19,17,'2021-05-10 21:12:05','2021-05-10 22:31:59'),(2,'wwwwww',1,17,19,'2021-05-10 22:16:48','2021-05-10 22:33:37'),(3,'eeeeee',1,19,17,'2021-05-10 22:18:21','2021-05-10 22:31:59'),(4,'rrrrrrr',1,17,19,'2021-05-10 22:22:45','2021-05-10 22:33:37'),(5,'tttttt',1,17,19,'2021-05-10 22:25:03','2021-05-10 22:33:37'),(6,'yyyyyyyy',1,17,19,'2021-05-10 22:26:17','2021-05-10 22:33:37'),(7,'uuuuuuuuu',1,19,17,'2021-05-10 22:27:13','2021-05-10 22:31:59'),(8,'iiiiiiiiii',1,19,17,'2021-05-10 22:27:40','2021-05-10 22:31:59'),(9,'oooooo',1,17,19,'2021-05-10 22:32:40','2021-05-10 22:33:37'),(10,'pppppp',1,17,19,'2021-05-10 22:32:53','2021-05-10 22:33:37'),(11,'aaaaaaa',1,17,19,'2021-05-10 22:33:12','2021-05-10 22:33:37'),(12,'sssssss',1,17,19,'2021-05-10 22:33:28','2021-05-10 22:33:37'),(13,'dddddd',NULL,17,19,'2021-05-10 22:33:44','2021-05-10 22:33:44'),(14,'fffffffff',NULL,17,19,'2021-05-10 22:33:53','2021-05-10 22:33:53');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `page` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `droit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `statut` tinyint(1) NOT NULL,
  `groupe_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `permissions_groupe_id_foreign` (`groupe_id`),
  CONSTRAINT `permissions_groupe_id_foreign` FOREIGN KEY (`groupe_id`) REFERENCES `groupes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=750 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (606,'ajustement','voir',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(607,'ajustement','ajouter',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(608,'ajustement','editer',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(609,'ajustement','supprimer',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(610,'corbeille','voir',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(611,'corbeille','ajouter',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(612,'corbeille','editer',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(613,'corbeille','supprimer',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(614,'dossier','voir',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(615,'dossier','ajouter',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(616,'dossier','editer',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(617,'dossier','supprimer',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(618,'message','voir',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(619,'message','ajouter',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(620,'message','editer',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(621,'message','supprimer',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(622,'parametre','voir',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(623,'parametre','ajouter',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(624,'parametre','editer',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(625,'parametre','supprimer',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(626,'planning','voir',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(627,'planning','ajouter',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(628,'planning','editer',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(629,'planning','supprimer',1,1,'2021-05-11 20:48:35','2021-05-11 20:48:35'),(678,'ajustement','voir',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(679,'ajustement','ajouter',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(680,'ajustement','editer',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(681,'ajustement','supprimer',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(682,'corbeille','voir',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(683,'corbeille','ajouter',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(684,'corbeille','editer',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(685,'corbeille','supprimer',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(686,'dossier','voir',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(687,'dossier','ajouter',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(688,'dossier','editer',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(689,'dossier','supprimer',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(690,'message','voir',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(691,'message','ajouter',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(692,'message','editer',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(693,'message','supprimer',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(694,'parametre','voir',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(695,'parametre','ajouter',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(696,'parametre','editer',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(697,'parametre','supprimer',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(698,'planning','voir',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(699,'planning','ajouter',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(700,'planning','editer',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(701,'planning','supprimer',1,4,'2021-05-12 09:37:16','2021-05-12 09:37:16'),(702,'ajustement','voir',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(703,'ajustement','ajouter',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(704,'ajustement','editer',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(705,'ajustement','supprimer',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(706,'corbeille','voir',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(707,'corbeille','ajouter',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(708,'corbeille','editer',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(709,'corbeille','supprimer',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(710,'dossier','voir',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(711,'dossier','ajouter',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(712,'dossier','editer',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(713,'dossier','supprimer',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(714,'message','voir',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(715,'message','ajouter',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(716,'message','editer',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(717,'message','supprimer',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(718,'parametre','voir',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(719,'parametre','ajouter',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(720,'parametre','editer',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(721,'parametre','supprimer',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(722,'planning','voir',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(723,'planning','ajouter',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(724,'planning','editer',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(725,'planning','supprimer',1,5,'2021-05-12 10:17:48','2021-05-12 10:17:48'),(726,'ajustement','voir',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(727,'ajustement','ajouter',0,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(728,'ajustement','editer',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(729,'ajustement','supprimer',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(730,'corbeille','voir',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(731,'corbeille','ajouter',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(732,'corbeille','editer',0,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(733,'corbeille','supprimer',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(734,'dossier','voir',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(735,'dossier','ajouter',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(736,'dossier','editer',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(737,'dossier','supprimer',0,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(738,'message','voir',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(739,'message','ajouter',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(740,'message','editer',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(741,'message','supprimer',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(742,'parametre','voir',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(743,'parametre','ajouter',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(744,'parametre','editer',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(745,'parametre','supprimer',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(746,'planning','voir',0,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(747,'planning','ajouter',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(748,'planning','editer',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47'),(749,'planning','supprimer',1,6,'2021-05-12 10:18:47','2021-05-12 10:18:47');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pieces`
--

DROP TABLE IF EXISTS `pieces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pieces` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nomPiece` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sizePiece` int(11) NOT NULL,
  `dossier_id` bigint(20) unsigned NOT NULL,
  `addBy` bigint(20) unsigned NOT NULL,
  `deletedBy` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pieces_dossier_id_foreign` (`dossier_id`),
  KEY `pieces_addby_foreign` (`addBy`),
  KEY `pieces_deletedby_foreign` (`deletedBy`),
  CONSTRAINT `pieces_addby_foreign` FOREIGN KEY (`addBy`) REFERENCES `users` (`id`),
  CONSTRAINT `pieces_deletedby_foreign` FOREIGN KEY (`deletedBy`) REFERENCES `users` (`id`),
  CONSTRAINT `pieces_dossier_id_foreign` FOREIGN KEY (`dossier_id`) REFERENCES `dossiers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pieces`
--

LOCK TABLES `pieces` WRITE;
/*!40000 ALTER TABLE `pieces` DISABLE KEYS */;
INSERT INTO `pieces` VALUES (1,'back.bat',252,7,16,NULL,'2021-05-14 14:33:00','2021-05-14 14:33:00',NULL),(2,'Node.js Socket.io tutorial_ Real-time chat application _ TSH.io.pdf',978408,7,16,NULL,'2021-05-14 14:33:00','2021-05-14 14:33:00',NULL),(3,'Using NPM To Install A Specific Version Of A Node.js Package.html',124722,8,16,NULL,'2021-05-14 14:33:45','2021-05-15 12:12:47',NULL),(4,'Blank document 136.txt',8295,9,16,NULL,'2021-05-15 10:21:23','2021-05-15 10:21:23',NULL),(5,'mariadb [Wiki ubuntu-fr].html',51005,9,16,NULL,'2021-05-15 10:21:23','2021-05-15 10:21:23',NULL),(6,'10 Tips and Tricks Every Developer Should Know in Visual Studio Code _ by Suresh Mohan _ Syncfusion _ Medium.pdf',1089158,9,16,NULL,'2021-05-15 10:21:23','2021-05-15 10:21:23',NULL),(7,'Deploy Laravel App (5.5) on Linux server · GitHub.html',70695,9,16,NULL,'2021-05-15 10:21:23','2021-05-15 10:21:23',NULL),(8,'Setup VS Code for Efficient PHP development 🚀 _ Theodo.pdf',919215,9,16,NULL,'2021-05-15 10:21:23','2021-05-15 10:21:23',NULL);
/*!40000 ALTER TABLE `pieces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rappels`
--

DROP TABLE IF EXISTS `rappels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rappels` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `motif` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dossier_id` bigint(20) unsigned NOT NULL,
  `alertUser` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rappels_dossier_id_foreign` (`dossier_id`),
  KEY `rappels_alertuser_foreign` (`alertUser`),
  CONSTRAINT `rappels_alertuser_foreign` FOREIGN KEY (`alertUser`) REFERENCES `users` (`id`),
  CONSTRAINT `rappels_dossier_id_foreign` FOREIGN KEY (`dossier_id`) REFERENCES `dossiers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rappels`
--

LOCK TABLES `rappels` WRITE;
/*!40000 ALTER TABLE `rappels` DISABLE KEYS */;
INSERT INTO `rappels` VALUES (1,'123123123','Sat May 15 2021 14:32:00 GMT+0000 (Greenwich Mean Time)',7,16,'2021-05-14 14:33:00','2021-05-14 14:33:00',NULL),(2,'4561233541','Sat May 15 2021 14:33:00 GMT+0000 (Greenwich Mean Time)',8,16,'2021-05-14 14:33:45','2021-05-15 12:12:47',NULL);
/*!40000 ALTER TABLE `rappels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rdvs`
--

DROP TABLE IF EXISTS `rdvs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rdvs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `intitule` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `startDate` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endDate` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdBy` bigint(20) unsigned NOT NULL,
  `forWho` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rdvs_createdby_foreign` (`createdBy`),
  KEY `rdvs_forwho_foreign` (`forWho`),
  CONSTRAINT `rdvs_createdby_foreign` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`),
  CONSTRAINT `rdvs_forwho_foreign` FOREIGN KEY (`forWho`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rdvs`
--

LOCK TABLES `rdvs` WRITE;
/*!40000 ALTER TABLE `rdvs` DISABLE KEYS */;
INSERT INTO `rdvs` VALUES (1,'azertyuiopqsdfghjklm','2021-02-01T00:00:00.000Z','2021-02-01T00:00:00.000Z',16,17,'2021-02-01 08:25:37','2021-02-01 08:25:37',NULL),(2,'11111111123333333321','2021-01-31T00:00:00.000Z','2021-02-02T00:00:00.000Z',16,16,'2021-02-01 08:27:29','2021-02-01 21:23:18',NULL),(3,'qwwertyuioplkjhgfdsa','2021-05-13T00:00:00.000Z','2021-05-13T00:00:00.000Z',18,16,'2021-05-12 10:35:08','2021-05-12 10:35:08',NULL);
/*!40000 ALTER TABLE `rdvs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `groupe_id` bigint(20) unsigned NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_groupe_id_foreign` (`groupe_id`),
  CONSTRAINT `users_groupe_id_foreign` FOREIGN KEY (`groupe_id`) REFERENCES `groupes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (16,'nomABC','prenom1','email1@mail.com',NULL,5,'$2y$10$igyzkdN2qJaXZY/PjGMWTu0XiI9/n6f/QNBZxyvlxDhoRTeIuysiu',NULL,'2020-12-23 16:40:58','2021-01-29 15:30:16'),(17,'nomb','prenom2','email2@mail.com',NULL,4,'$2y$10$wzFPKqXiY4OmwlFw8/D.KOgkZ7lVEALXdIZ7/.PotRor23mIjtvAm',NULL,'2020-12-23 16:42:06','2020-12-23 16:42:06'),(18,'nomc','prenom3','email3@mail.com',NULL,1,'$2y$10$DwMIjC1IC95HPdZxHqNCDOrmnH9NkR02oNmjnmLiqtaReq7z0wRVW',NULL,'2020-12-23 16:42:51','2020-12-23 16:42:51'),(19,'nomDd','prenom44','email4@mail.com',NULL,6,'$2y$10$WgqcUdIVjXY4fNT6qtC4we5L9FYVH4TQTzLg8B/LPVZop5HnAQwKO',NULL,'2021-04-26 16:25:52','2021-05-14 08:39:48');
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

-- Dump completed on 2021-05-26  9:52:25
