-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Asiakas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Asiakas` (
  `asiakasId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nimi` VARCHAR(45) NOT NULL,
  `kayntiosoite` VARCHAR(45) NULL,
  `postinumero` CHAR(5) NULL,
  `postitoimipaikka` VARCHAR(45) NULL,
  `status` TINYINT(1) UNSIGNED NULL,
  `Asiakascol` VARCHAR(45) NULL,
  PRIMARY KEY (`asiakasId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_swedish_ci;


-- -----------------------------------------------------
-- Table `mydb`.`Tilaus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Tilaus` (
  `tilausnumero` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tilauspvm` DATE NULL,
  `toimituspvm` DATE NULL,
  `asiakasId` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`tilausnumero`),
  INDEX `fk_Tilaus_Asiakas_idx` (`asiakasId` ASC) VISIBLE,
  CONSTRAINT `fk_Tilaus_Asiakas`
    FOREIGN KEY (`asiakasId`)
    REFERENCES `mydb`.`Asiakas` (`asiakasId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Tilausrivi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Tilausrivi` (
  `tilausriviId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tuote` VARCHAR(45) NULL,
  `maara` INT UNSIGNED NULL,
  `yksikko` VARCHAR(45) NULL,
  `huomautus` VARCHAR(255) NULL,
  `verotonHinta` DECIMAL(6,2) UNSIGNED NULL,
  `veroprosentti` DECIMAL(4,3) UNSIGNED NULL,
  `toimitettu` TINYINT(1) UNSIGNED NULL,
  `tilausId` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`tilausriviId`),
  INDEX `fk_Tilausrivi_Tilaus1_idx` (`tilausId` ASC) VISIBLE,
  CONSTRAINT `fk_Tilausrivi_Tilaus1`
    FOREIGN KEY (`tilausId`)
    REFERENCES `mydb`.`Tilaus` (`tilausnumero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
