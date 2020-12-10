/* 
    HOW TO USE THIS SCRIPT
    
    $> mysql -u {user_name} -p < create_database.sql

    Important!! 
    This sentence must to be executed where this file is.
*/


/*
 UNCOMMENT if you are using local 
-- DROP DATABASE IF EXISTS database_links;
-- CREATE DATABASE IF NOT EXISTS database_links CHARACTER SET utf8 COLLATE utf8_general_ci;

-- USE database_links; 
*/

/* *************************************************
    Create users table 
    fields:  id, username, password, fullname
************************************************* */
DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
) ENGINE = InnoDB;


/* *********************************************************
    Create links table 
    fields:  id, title, url, description, user_id -> users(id)
********************************************************* */
DROP TABLE IF EXISTS links;
CREATE TABLE links(
    id          INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title       VARCHAR(150) NOT NULL,
    url         VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    user_id     INT(11),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE = InnoDB;


DESCRIBE users;

DESCRIBE links;
