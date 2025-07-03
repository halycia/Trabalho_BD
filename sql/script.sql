CREATE TABLE Prato
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(90) UNIQUE NOT NULL,
    icone BYTEA,
    categoria VARCHAR (25)
);

CREATE TABLE Ingrediente
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(40) UNIQUE NOT NULL,
    restricao VARCHAR(50)
);

CREATE TABLE Usuario
(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(70) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL
);


CREATE TABLE Campus
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(25),
    endereco VARCHAR(200) UNIQUE NOT NULL
);


CREATE TABLE Restaurante
(
    id SERIAL PRIMARY KEY, 
    numRestaurante INT NOT NULL,
    status VARCHAR(100),
    capacidade INT,
    idCampus INT NOT NULL REFERENCES Campus(id) ON DELETE CASCADE,
    UNIQUE (numRestaurante, idCampus)
);



CREATE TABLE Setor
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50),
    telefone VARCHAR(25) UNIQUE,
    idCampus INT NOT NULL REFERENCES Campus(id) ON DELETE CASCADE,
    UNIQUE (nome, idCampus)
);


CREATE TABLE Feedback
(
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    texto VARCHAR(500) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    idSetor INT NOT NULL REFERENCES Setor(id) ON DELETE CASCADE,
    idUsuario INT NOT NULL REFERENCES Usuario(id) ON DELETE CASCADE
);


CREATE TABLE Avaliacao
(
    id SERIAL PRIMARY KEY,
    dataAvaliacao DATE NOT NULL,
    refeicao VARCHAR(50) NOT NULL,
    dataConsumo DATE NOT NULL,
    nota INT NOT NULL,
    texto VARCHAR(500) NOT NULL,
    idUsuario INT NOT NULL REFERENCES Usuario(id) ON DELETE CASCADE,
    idPrato INT NOT NULL REFERENCES Prato(id) ON DELETE CASCADE
);


CREATE TABLE Comentario
(
    id SERIAL PRIMARY KEY,
    texto VARCHAR(500) NOT NULL,
    data DATE NOT NULL,
    idAvaliacao INT NOT NULL REFERENCES Avaliacao(id) ON DELETE CASCADE,
    idUsuario INT NOT NULL REFERENCES Usuario(id) ON DELETE CASCADE
);


CREATE TABLE Cardapio
(
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    especial VARCHAR(40)
);


CREATE TABLE Ingrediente_Prato
(
    idIngrediente INT,
    idPrato INT,
    PRIMARY KEY (idIngrediente, idPrato),
    FOREIGN KEY (idIngrediente) REFERENCES Ingrediente(id) ON DELETE CASCADE,
    FOREIGN KEY (idPrato) REFERENCES Prato(id) ON DELETE CASCADE
);


CREATE TABLE Cardapio_Restaurante
(
    idRestaurante INT,
    idCardapio INT,
    PRIMARY KEY (idRestaurante, idCardapio),
 FOREIGN KEY (idRestaurante) REFERENCES Restaurante(id) ON DELETE CASCADE,
    FOREIGN KEY (idCardapio) REFERENCES Cardapio(id) ON DELETE CASCADE
);


CREATE TABLE Cardapio_Prato
(
    idCardapio INT,
    idPrato INT,
    refeicao VARCHAR(50) NOT NULL,
    PRIMARY KEY (idCardapio, idPrato),
    FOREIGN KEY (idCardapio) REFERENCES Cardapio(id) ON DELETE CASCADE,
    FOREIGN KEY (idPrato) REFERENCES Prato(id) ON DELETE CASCADE
);