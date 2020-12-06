CREATE DATABASE proyecto;

USE proyecto;

-- Users Table
CREATE TABLE Usuarios(
    id INT(11) NOT NULL,
    correo VARCHAR(16)  NOT NULL,
    nombreCompleto VARCHAR(100) NOT NULL,
    password VARCHAR(60) NOT NULL,
    telefono VARCHAR(100) NOT NULL
);

ALTER TABLE Usuarios
    ADD PRIMARY KEY  (id);

ALTER TABLE Usuarios
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE users;
-- Links Table
CREATE TABLE links (
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE links
    ADD PRIMARY KEY (id);

ALTER TABLE links
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE links;