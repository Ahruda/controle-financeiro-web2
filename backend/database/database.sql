create database transactions;
use transactions; 

create table usuarios(usuario varchar (100) not null, email varchar(100) not null, senha varchar(100) not null, id integer auto_increment not null, primary key(id));
create table categories (titulo varchar (100) not null, id int not null AUTO_INCREMENT, PRIMARY KEY (id));
create table transactions (titulo varchar(150) not NULL, valor double not NULL, categoria_id int not null, usuario_id int not null, tipo int not null, datacao varchar(20) not null, hora varchar(50) not null, id int NOT NULL AUTO_INCREMENT, PRIMARY KEY (id), FOREIGN KEY (categoria_id) REFERENCES categories(id), FOREIGN KEY (usuario_id) REFERENCES usuarios(id));
create table contact (nome varchar(150) not null, email varchar(150) not null, message varchar(500), id int NOT NULL AUTO_INCREMENT, PRIMARY KEY (id));

insert into categories values("Estudo",NULL);
insert into categories values("Casa",NULL);
insert into categories values("Viagem",NULL);
insert into categories values("Compras",NULL);
insert into categories values("Supermercado",NULL);




