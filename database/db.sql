CREATE DATABASE proyecto;

USE proyecto;

CREATE TABLE Usuarios(
    id INT(11) NOT NULL,
    correo VARCHAR(100)  NOT NULL UNIQUE,
    nombreCompleto VARCHAR(100) NOT NULL,
    password VARCHAR(60) NOT NULL,
    telefono VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Respuestas (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombrePregunta VARCHAR(255) NOT NULL,
    respuesta INT(1) NOT NULL,
    user_id INT(11),
    PRIMARY KEY(id),
    CONSTRAINT fk_user1 FOREIGN KEY (user_id) REFERENCES Usuarios(id)
);

CREATE TABLE Materias (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombreMateria VARCHAR(30) NOT NULL,
    conteo INT(10) NOT NULL,
    user_id INT(11),
    PRIMARY KEY(id),
    CONSTRAINT fk_user2 FOREIGN KEY (user_id) REFERENCES Usuarios(id)
);

CREATE TABLE debito(
    id INT NOT NULL AUTO_INCREMENT ,
    codigoTarjeta VARCHAR(20) NOT NULL,
    fechaCaducidad VARCHAR(20) NOT NULL,
    cvc INT(3) NOT NULL,
    user_id INT(11) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user3 FOREIGN KEY (user_id) REFERENCES Usuarios(id)
);

CREATE TABLE credito(
    id INT NOT NULL AUTO_INCREMENT ,
    codigoTarjeta VARCHAR(20) NOT NULL,
    apellidos VARCHAR(30) NOT NULL,
    telefono INT(10) NOT NULL,
    fechaCaducidad VARCHAR(20) NOT NULL,
    cvc INT(3) NOT NULL,
    user_id INT(11) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user4 FOREIGN KEY (user_id) REFERENCES Usuarios(id)
);
