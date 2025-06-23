-- Script d'initialisation pour AlwaysData
-- Base de données: form2app_db
-- Utilisateur: form2app

-- Création de la table utilisateur
CREATE TABLE IF NOT EXISTS utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    date_naissance VARCHAR(20) NOT NULL,
    pays VARCHAR(100) NOT NULL DEFAULT 'France',
    ville VARCHAR(100) NOT NULL,
    code_postal VARCHAR(5) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Création de la table admin
CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertion de l'administrateur par défaut
INSERT INTO admin (email, password) 
VALUES ('loise.fenoll@ynov.com', 'PvdrTAzTeR247sDnAZBr') 
ON DUPLICATE KEY UPDATE 
    password = VALUES(password);

-- Insertion de quelques utilisateurs de test
INSERT INTO utilisateur (nom, prenom, email, date_naissance, pays, ville, code_postal) 
VALUES 
    ('Dupont', 'Jean', 'jean.dupont@example.com', '1990-01-01', 'France', 'Paris', '75001'),
    ('Martin', 'Marie', 'marie.martin@example.com', '1985-05-15', 'France', 'Lyon', '69000'),
    ('Bernard', 'Pierre', 'pierre.bernard@example.com', '1992-03-20', 'France', 'Marseille', '13001')
ON DUPLICATE KEY UPDATE 
    nom = VALUES(nom);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_email_utilisateur ON utilisateur(email);
CREATE INDEX IF NOT EXISTS idx_email_admin ON admin(email);
CREATE INDEX IF NOT EXISTS idx_ville ON utilisateur(ville);
CREATE INDEX IF NOT EXISTS idx_code_postal ON utilisateur(code_postal);

-- Vérification des tables créées
SELECT 'Tables créées avec succès' as status;
SELECT COUNT(*) as nb_utilisateurs FROM utilisateur;
SELECT COUNT(*) as nb_admins FROM admin; 