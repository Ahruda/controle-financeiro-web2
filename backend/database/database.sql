create database transactions;
use transactions;

create table transactions (titulo varchar(150) not null, valor double precision not null, categoria varchar(150) not null, tipo int not null, datacao varchar(20) not null, hora varchar(50) not null, id int NOT NULL AUTO_INCREMENT, PRIMARY KEY (id));
create table contact (nome varchar(150) not null, email varchar(150) not null, message varchar(500), id int NOT NULL AUTO_INCREMENT, PRIMARY KEY (id));

select * from transactions;
select * from contact;
