-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: archive
-- ------------------------------------------------------
-- Server version	5.7.21-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
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
  `cycleVie` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_designation_unique` (`designation`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (41,'categorie a',2,'2020-12-21 21:33:11','2020-12-21 21:38:40'),(43,'categprie 3',1,'2020-12-21 21:35:11','2020-12-21 21:35:11'),(44,'categorie 4',3,'2020-12-21 21:36:05','2020-12-21 21:36:05'),(45,'categorie 5',2,'2020-12-21 21:36:33','2020-12-21 21:36:33'),(46,'categorie 6',1,'2020-12-21 21:37:02','2020-12-21 21:37:02');
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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_groupes`
--

LOCK TABLES `category_groupes` WRITE;
/*!40000 ALTER TABLE `category_groupes` DISABLE KEYS */;
INSERT INTO `category_groupes` VALUES (47,4,43,'2020-12-21 21:35:11','2020-12-21 21:35:11'),(52,4,46,'2020-12-21 21:37:02','2020-12-21 21:37:02'),(53,1,46,'2020-12-21 21:37:02','2020-12-21 21:37:02'),(54,5,41,'2020-12-21 21:38:40','2020-12-21 21:38:40'),(55,4,41,'2020-12-21 21:38:40','2020-12-21 21:38:40'),(56,1,41,'2020-12-21 21:38:41','2020-12-21 21:38:41'),(63,1,45,'2020-12-21 21:42:04','2020-12-21 21:42:04'),(64,4,45,'2020-12-21 21:42:04','2020-12-21 21:42:04'),(65,4,44,'2020-12-21 21:48:16','2020-12-21 21:48:16'),(66,5,44,'2020-12-21 21:48:16','2020-12-21 21:48:16');
/*!40000 ALTER TABLE `category_groupes` ENABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `dossiers_nom_unique` (`nom`),
  UNIQUE KEY `dossiers_numerodossier_unique` (`numeroDossier`),
  KEY `dossiers_categorie_id_foreign` (`categorie_id`),
  KEY `dossiers_createdby_foreign` (`createdBy`),
  KEY `dossiers_deletedby_foreign` (`deletedBy`),
  CONSTRAINT `dossiers_categorie_id_foreign` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `dossiers_createdby_foreign` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`),
  CONSTRAINT `dossiers_deletedby_foreign` FOREIGN KEY (`deletedBy`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dossiers`
--

LOCK TABLES `dossiers` WRITE;
/*!40000 ALTER TABLE `dossiers` DISABLE KEYS */;
INSERT INTO `dossiers` VALUES (1,'dossier janv','Fld/15/01/21/n°1',41,16,NULL,'2021-01-15 23:55:02','2021-01-15 23:55:02'),(2,'dossier fev','Fld/15/01/21/n°2',43,16,NULL,'2021-01-15 23:56:23','2021-01-15 23:56:23'),(3,'dossier mars','Fld/15/01/21/n°3',44,16,NULL,'2021-01-15 23:57:51','2021-01-15 23:57:51'),(4,'dossier avr','Fld/15/01/21/n°4',45,16,NULL,'2021-01-15 23:58:46','2021-01-15 23:58:46'),(5,'dossier mai','Fld/16/01/21/n°5',45,16,NULL,'2021-01-16 00:08:44','2021-01-16 00:08:44'),(6,'aezeze','Fld/16/01/21/n°6',46,16,NULL,'2021-01-16 00:20:37','2021-01-16 00:20:37');
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
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupes`
--

LOCK TABLES `groupes` WRITE;
/*!40000 ALTER TABLE `groupes` DISABLE KEYS */;
INSERT INTO `groupes` VALUES (1,'groupe 1','2020-12-10 19:11:48','2020-12-11 10:27:47'),(4,'groupe4','2020-12-11 10:13:26','2020-12-11 10:13:26'),(5,'groupe 5','2020-12-11 10:27:25','2020-12-11 10:27:25');
/*!40000 ALTER TABLE `groupes` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2020_12_04_093831_create_groupes_table',1),(2,'2020_12_10_190725_create_permissions_table',1),(3,'2020_12_11_093401_create_categories_table',1),(4,'2020_12_12_000000_create_users_table',1),(5,'2020_12_12_100000_create_password_resets_table',1),(6,'2020_12_12_110512_create_category_groupes_table',1),(19,'2020_12_31_093539_create_dossiers_table',2),(20,'2020_12_31_093601_create_pieces_table',2),(21,'2021_01_06_101017_create_rappels_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=482 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (362,'ajustement','voir',1,5,'2020-12-11 10:27:25','2020-12-11 10:27:25'),(363,'ajustement','ajouter',1,5,'2020-12-11 10:27:25','2020-12-11 10:27:25'),(364,'ajustement','editer',1,5,'2020-12-11 10:27:25','2020-12-11 10:27:25'),(365,'ajustement','supprimer',1,5,'2020-12-11 10:27:25','2020-12-11 10:27:25'),(366,'corbeille','voir',1,5,'2020-12-11 10:27:25','2020-12-11 10:27:25'),(367,'corbeille','ajouter',1,5,'2020-12-11 10:27:25','2020-12-11 10:27:25'),(368,'corbeille','editer',0,5,'2020-12-11 10:27:25','2020-12-11 10:27:25'),(369,'corbeille','supprimer',0,5,'2020-12-11 10:27:25','2020-12-11 10:27:25'),(370,'dossier','voir',1,5,'2020-12-11 10:27:25','2020-12-11 10:27:25'),(371,'dossier','ajouter',1,5,'2020-12-11 10:27:25','2020-12-11 10:27:25'),(372,'dossier','editer',1,5,'2020-12-11 10:27:26','2020-12-11 10:27:26'),(373,'dossier','supprimer',0,5,'2020-12-11 10:27:26','2020-12-11 10:27:26'),(374,'echange','voir',0,5,'2020-12-11 10:27:26','2020-12-11 10:27:26'),(375,'echange','ajouter',0,5,'2020-12-11 10:27:26','2020-12-11 10:27:26'),(376,'echange','editer',1,5,'2020-12-11 10:27:26','2020-12-11 10:27:26'),(377,'echange','supprimer',1,5,'2020-12-11 10:27:26','2020-12-11 10:27:26'),(378,'parametre','voir',0,5,'2020-12-11 10:27:26','2020-12-11 10:27:26'),(379,'parametre','ajouter',0,5,'2020-12-11 10:27:26','2020-12-11 10:27:26'),(380,'parametre','editer',0,5,'2020-12-11 10:27:26','2020-12-11 10:27:26'),(381,'parametre','supprimer',1,5,'2020-12-11 10:27:26','2020-12-11 10:27:26'),(382,'planning','voir',1,5,'2020-12-11 10:27:26','2020-12-11 10:27:26'),(383,'planning','ajouter',1,5,'2020-12-11 10:27:26','2020-12-11 10:27:26'),(384,'planning','editer',1,5,'2020-12-11 10:27:26','2020-12-11 10:27:26'),(385,'planning','supprimer',1,5,'2020-12-11 10:27:26','2020-12-11 10:27:26'),(410,'ajustement','voir',0,1,'2020-12-11 10:29:16','2020-12-11 10:29:16'),(411,'ajustement','ajouter',1,1,'2020-12-11 10:29:16','2020-12-11 10:29:16'),(412,'ajustement','editer',0,1,'2020-12-11 10:29:16','2020-12-11 10:29:16'),(413,'ajustement','supprimer',0,1,'2020-12-11 10:29:16','2020-12-11 10:29:16'),(414,'corbeille','voir',0,1,'2020-12-11 10:29:16','2020-12-11 10:29:16'),(415,'corbeille','ajouter',0,1,'2020-12-11 10:29:16','2020-12-11 10:29:16'),(416,'corbeille','editer',1,1,'2020-12-11 10:29:16','2020-12-11 10:29:16'),(417,'corbeille','supprimer',1,1,'2020-12-11 10:29:16','2020-12-11 10:29:16'),(418,'dossier','voir',0,1,'2020-12-11 10:29:16','2020-12-11 10:29:16'),(419,'dossier','ajouter',0,1,'2020-12-11 10:29:16','2020-12-11 10:29:16'),(420,'dossier','editer',1,1,'2020-12-11 10:29:16','2020-12-11 10:29:16'),(421,'dossier','supprimer',1,1,'2020-12-11 10:29:17','2020-12-11 10:29:17'),(422,'echange','voir',1,1,'2020-12-11 10:29:17','2020-12-11 10:29:17'),(423,'echange','ajouter',0,1,'2020-12-11 10:29:17','2020-12-11 10:29:17'),(424,'echange','editer',1,1,'2020-12-11 10:29:17','2020-12-11 10:29:17'),(425,'echange','supprimer',1,1,'2020-12-11 10:29:17','2020-12-11 10:29:17'),(426,'parametre','voir',1,1,'2020-12-11 10:29:17','2020-12-11 10:29:17'),(427,'parametre','ajouter',1,1,'2020-12-11 10:29:17','2020-12-11 10:29:17'),(428,'parametre','editer',0,1,'2020-12-11 10:29:17','2020-12-11 10:29:17'),(429,'parametre','supprimer',1,1,'2020-12-11 10:29:17','2020-12-11 10:29:17'),(430,'planning','voir',1,1,'2020-12-11 10:29:17','2020-12-11 10:29:17'),(431,'planning','ajouter',1,1,'2020-12-11 10:29:17','2020-12-11 10:29:17'),(432,'planning','editer',1,1,'2020-12-11 10:29:17','2020-12-11 10:29:17'),(433,'planning','supprimer',0,1,'2020-12-11 10:29:17','2020-12-11 10:29:17'),(458,'ajustement','voir',1,4,'2020-12-31 14:25:32','2020-12-31 14:25:32'),(459,'ajustement','ajouter',0,4,'2020-12-31 14:25:32','2020-12-31 14:25:32'),(460,'ajustement','editer',0,4,'2020-12-31 14:25:32','2020-12-31 14:25:32'),(461,'ajustement','supprimer',0,4,'2020-12-31 14:25:32','2020-12-31 14:25:32'),(462,'corbeille','voir',0,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(463,'corbeille','ajouter',1,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(464,'corbeille','editer',0,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(465,'corbeille','supprimer',0,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(466,'dossier','voir',0,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(467,'dossier','ajouter',0,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(468,'dossier','editer',1,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(469,'dossier','supprimer',0,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(470,'echange','voir',0,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(471,'echange','ajouter',0,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(472,'echange','editer',0,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(473,'echange','supprimer',1,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(474,'parametre','voir',1,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(475,'parametre','ajouter',0,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(476,'parametre','editer',1,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(477,'parametre','supprimer',0,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(478,'planning','voir',0,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(479,'planning','ajouter',1,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(480,'planning','editer',0,4,'2020-12-31 14:25:33','2020-12-31 14:25:33'),(481,'planning','supprimer',0,4,'2020-12-31 14:25:33','2020-12-31 14:25:33');
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
  PRIMARY KEY (`id`),
  KEY `pieces_dossier_id_foreign` (`dossier_id`),
  KEY `pieces_addby_foreign` (`addBy`),
  KEY `pieces_deletedby_foreign` (`deletedBy`),
  CONSTRAINT `pieces_addby_foreign` FOREIGN KEY (`addBy`) REFERENCES `users` (`id`),
  CONSTRAINT `pieces_deletedby_foreign` FOREIGN KEY (`deletedBy`) REFERENCES `users` (`id`),
  CONSTRAINT `pieces_dossier_id_foreign` FOREIGN KEY (`dossier_id`) REFERENCES `dossiers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pieces`
--

LOCK TABLES `pieces` WRITE;
/*!40000 ALTER TABLE `pieces` DISABLE KEYS */;
INSERT INTO `pieces` VALUES (1,'attestation_stage.pdf',1156043,1,16,NULL,'2021-01-15 23:55:03','2021-01-15 23:55:03'),(2,'attestation_stage.pdf',1156043,2,16,NULL,'2021-01-15 23:56:23','2021-01-15 23:56:23'),(3,'CNIB.pdf',561936,2,16,NULL,'2021-01-15 23:56:23','2021-01-15 23:56:23'),(4,'CNIB.pdf',561936,3,16,NULL,'2021-01-15 23:57:52','2021-01-15 23:57:52'),(5,'cv_LANKOANDE.pdf',1010409,3,16,NULL,'2021-01-15 23:57:52','2021-01-15 23:57:52'),(6,'attestation_stage.pdf',1156043,3,16,NULL,'2021-01-15 23:57:52','2021-01-15 23:57:52'),(7,'cv_LANKOANDE.pdf',1010409,4,16,NULL,'2021-01-15 23:58:46','2021-01-15 23:58:46'),(8,'cv.docx',24676,4,16,NULL,'2021-01-15 23:58:46','2021-01-15 23:58:46'),(9,'attestation_stage.pdf',1156043,4,16,NULL,'2021-01-15 23:58:46','2021-01-15 23:58:46'),(10,'CNIB.pdf',561936,4,16,NULL,'2021-01-15 23:58:46','2021-01-15 23:58:46'),(11,'cv_LANKOANDE.pdf',1010409,5,16,NULL,'2021-01-16 00:08:44','2021-01-16 00:08:44'),(12,'CNIB.pdf',561936,5,16,NULL,'2021-01-16 00:08:44','2021-01-16 00:08:44'),(13,'cv.pdf',24133,5,16,NULL,'2021-01-16 00:08:45','2021-01-16 00:08:45'),(14,'attestation_stage.pdf',1156043,5,16,NULL,'2021-01-16 00:08:45','2021-01-16 00:08:45'),(15,'cv.docx',24676,5,16,NULL,'2021-01-16 00:08:45','2021-01-16 00:08:45'),(16,'LettreMotivation.doc',17408,6,16,NULL,'2021-01-16 00:20:37','2021-01-16 00:20:37');
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
  PRIMARY KEY (`id`),
  KEY `rappels_dossier_id_foreign` (`dossier_id`),
  KEY `rappels_alertuser_foreign` (`alertUser`),
  CONSTRAINT `rappels_alertuser_foreign` FOREIGN KEY (`alertUser`) REFERENCES `users` (`id`),
  CONSTRAINT `rappels_dossier_id_foreign` FOREIGN KEY (`dossier_id`) REFERENCES `dossiers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rappels`
--

LOCK TABLES `rappels` WRITE;
/*!40000 ALTER TABLE `rappels` DISABLE KEYS */;
INSERT INTO `rappels` VALUES (1,'motif','Sat Jan 16 2021 23:54:00 GMT+0000 (Greenwich Mean Time)',1,16,'2021-01-15 23:55:03','2021-01-15 23:55:03'),(2,'motir fev','Wed Jan 20 2021 23:55:00 GMT+0000 (Greenwich Mean Time)',2,16,'2021-01-15 23:56:23','2021-01-15 23:56:23'),(3,'motif','Sat Jan 16 2021 23:56:00 GMT+0000 (Greenwich Mean Time)',3,16,'2021-01-15 23:57:52','2021-01-15 23:57:52'),(4,'motif avril','Sat Jan 30 2021 23:57:00 GMT+0000 (Greenwich Mean Time)',4,16,'2021-01-15 23:58:46','2021-01-15 23:58:46');
/*!40000 ALTER TABLE `rappels` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (16,'nomA','prenom1','email1@mail.com',NULL,5,'$2y$10$igyzkdN2qJaXZY/PjGMWTu0XiI9/n6f/QNBZxyvlxDhoRTeIuysiu',NULL,'2020-12-23 16:40:58','2020-12-23 16:40:58'),(17,'nomb','prenom2','email2@mail.com',NULL,4,'$2y$10$wzFPKqXiY4OmwlFw8/D.KOgkZ7lVEALXdIZ7/.PotRor23mIjtvAm',NULL,'2020-12-23 16:42:06','2020-12-23 16:42:06'),(18,'nomc','prenom3','email3@mail.com',NULL,1,'$2y$10$DwMIjC1IC95HPdZxHqNCDOrmnH9NkR02oNmjnmLiqtaReq7z0wRVW',NULL,'2020-12-23 16:42:51','2020-12-23 16:42:51');
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

-- Dump completed on 2021-01-19 23:43:17
