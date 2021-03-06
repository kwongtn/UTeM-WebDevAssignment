SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `USER`;
DROP TABLE IF EXISTS `HISTORY`;
DROP TABLE IF EXISTS `AREA`;
DROP TABLE IF EXISTS `SESSION`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `USER` (
    `userID` int NOT NULL AUTO_INCREMENT,
    `name` text NOT NULL,
    `email` text NOT NULL,
    `notes` text,
    `areaID` int,
    `password` text NOT NULL,
    PRIMARY KEY (`userID`)
);

CREATE TABLE `HISTORY` (
    `historyID` int NOT NULL AUTO_INCREMENT,
    `dateTime` dateTime NOT NULL,
    `sourceAreaID` int,
    `destAreaID` int,
    `userID` int NOT NULL,
    PRIMARY KEY (`historyID`)
);

CREATE TABLE `AREA` (
    `areaID` int NOT NULL AUTO_INCREMENT,
    `areaName` TINYTEXT NOT NULL,
    PRIMARY KEY (`areaID`)
);

CREATE TABLE `SESSION` (
    `sessionTracker` int NOT NULL AUTO_INCREMENT,
    `sessionID` text NOT NULL,
    `userID` int NOT NULL,
    PRIMARY KEY (`sessionTracker`)
);

ALTER TABLE `USER` ADD FOREIGN KEY (`areaID`) REFERENCES `AREA`(`areaID`);
ALTER TABLE `SESSION` ADD FOREIGN KEY (`userID`) REFERENCES `USER`(`userID`);
ALTER TABLE `HISTORY` ADD FOREIGN KEY (`userID`) REFERENCES `USER`(`userID`);
ALTER TABLE `HISTORY` ADD FOREIGN KEY (`sourceAreaID`) REFERENCES `AREA`(`areaID`);
ALTER TABLE `HISTORY` ADD FOREIGN KEY (`destAreaID`) REFERENCES `AREA`(`areaID`);