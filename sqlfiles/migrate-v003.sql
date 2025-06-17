USE form2_db;

INSERT INTO admin (email, password) VALUES ("admin@form2.com", "admin123");

INSERT INTO utilisateur (nom, prenom, email, date_naissance, pays, ville, code_postal)
VALUES 
    ("Dupont", "Jean", "jean.dupont@example.com", "1990-01-15", "France", "Paris", "75001"),
    ("Martin", "Marie", "marie.martin@example.com", "1985-06-20", "France", "Lyon", "69000"),
    ("Bernard", "Pierre", "pierre.bernard@example.com", "1992-03-10", "France", "Marseille", "13000"); 