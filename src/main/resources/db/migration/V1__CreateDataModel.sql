create table car (id bigint not null, brand varchar(255), colour varchar(255), model varchar(255), price integer not null, registration_number varchar(255), year integer not null, primary key (id)) engine=MyISAM ;
create table car_owner (id bigint not null, owner_id bigint not null, primary key (id, owner_id)) engine=MyISAM;

create table hibernate_sequence (next_val bigint) engine=MyISAM;
insert into hibernate_sequence values ( 1 );
insert into hibernate_sequence values ( 1 );

create table owner (owner_id bigint not null, first_name varchar(255), last_name varchar(255), primary key (owner_id)) engine=MyISAM;
create table user (id bigint not null auto_increment, password varchar(255) not null, role varchar(255) not null, username varchar(255) not null, primary key (id)) engine=MyISAM;

alter table user add constraint UK_sb8bbouer5wak8vyiiy4pf2bx unique (username);
alter table car_owner add constraint FKg4oheym6xvth3owqj7qucf7li foreign key (owner_id) references owner (owner_id);
alter table car_owner add constraint FKofvh7bce0mwfwfud5r1k21w3p foreign key (id) references car (id);


