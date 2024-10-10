create database nextGenDB;

use nextGenDB;

create table contatos (
	id_contato int not null AUTO_INCREMENT PRIMARY KEY,
	nome varchar(20) not null,
	sobrenome varchar(20) not null,
	email varchar(100) not null,
	telefone varchar(19) not null,
	assunto varchar(21) not null,
	mensagem varchar(300) not null
);


create table usuarios(
	id_Usuario text PRIMARY KEY,
	nomeCompleto text,
	nomeEmpresa text,
	email text,
	senha text,
	genero text
);


create table empresasParceiras (
    id_empresaParceira int not null AUTO_INCREMENT PRIMARY KEY,
    nomeEmpresa varchar(30) not null,
    nomeContatante varchar(50) not null,
    emailContatante varchar(100) not null
);


