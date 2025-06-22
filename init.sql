-- SQL script to create database tables for the library system

-- Table: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(20) NOT NULL CHECK (perfil IN ('bibliotecario', 'leitor'))
);

-- Table: livros
CREATE TABLE IF NOT EXISTS livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    ano_publicacao INTEGER NOT NULL,
    quantidade_disponivel INTEGER NOT NULL
);

-- Table: emprestimos
CREATE TABLE IF NOT EXISTS emprestimos (
    id SERIAL PRIMARY KEY,
    livro_id INTEGER NOT NULL REFERENCES livros(id),
    leitor_id INTEGER NOT NULL REFERENCES usuarios(id),
    data_emprestimo DATE NOT NULL,
    data_devolucao_prevista DATE NOT NULL,
    data_devolucao_real DATE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('ativo', 'pendente', 'devolvido', 'atrasado'))
);
