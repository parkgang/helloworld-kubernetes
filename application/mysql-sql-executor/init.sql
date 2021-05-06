create database hello_world;

use hello_world;

create table hello_user(
    id int auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    email varchar(50)
);