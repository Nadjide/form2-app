-- Création de la base de données
CREATE DATABASE IF NOT EXISTS form2app;
USE form2app;

-- Création de la table users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    birthDate DATE NOT NULL,
    postalCode VARCHAR(5) NOT NULL,
    city VARCHAR(100) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    password VARCHAR(255) DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertion de l'administrateur par défaut
INSERT INTO users (firstName, lastName, email, birthDate, postalCode, city, isAdmin, password) 
VALUES (
    'Loise', 
    'Fenoll', 
    'loise.fenoll@ynov.com', 
    '1990-01-01', 
    '75001', 
    'Paris', 
    TRUE,
    'PvdrTAzTeR247sDnAZBr'
) ON DUPLICATE KEY UPDATE 
    firstName = VALUES(firstName),
    lastName = VALUES(lastName),
    isAdmin = VALUES(isAdmin),
    password = VALUES(password);

-- Index pour améliorer les performances
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_isAdmin ON users(isAdmin); 