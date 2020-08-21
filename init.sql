create table address(
id serial primary key,
name varchar(255),
last_name varchar(255),
address varchar(255),
constraint unique_address unique(name,last_name,address)
);