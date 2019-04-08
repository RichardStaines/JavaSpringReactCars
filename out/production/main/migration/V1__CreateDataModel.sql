drop table car if exists;
drop table car_owner if exists;
drop table owner if exists;
drop sequence hibernate_sequence;

create sequence hibernate_sequence start with 1 increment by 1;

create table car (id bigint not null, brand varchar(255), colour varchar(255), model varchar(255), price integer not null, registration_number varchar(255), year integer not null, primary key (id));
create table car_owner (id bigint not null, owner_id bigint not null, primary key (id, owner_id));
create table owner (owner_id bigint not null, first_name varchar(255), last_name varchar(255), primary key (owner_id));
alter table car_owner add constraint FKg4oheym6xvth3owqj7qucf7li foreign key (owner_id) references owner;
alter table car_owner add constraint FKofvh7bce0mwfwfud5r1k21w3p foreign key (id) references car;

insert into owner
(first_name, last_name)
values
("John", "Wayne"),
("John", "Johnson"),
("Harriette", "Hodgson");

insert into car
(brand, model, colour, registration_number, price, year)
values
("Ford", "Mustang", "Red",
  "ADF-1121", 56000, 1975),
("MG", "MG3", "Blue",
  "ZZZ-319", 13000, 2019),
("Mazda", "6 estate", "Green",
  "ABC-7072", 34000, 2013);

 insert into car_owner
  (id, owner_id)
 values
  (1, 1),
  (2, 2),
  (3, 2);

