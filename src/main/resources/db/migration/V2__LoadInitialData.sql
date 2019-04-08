insert into user
(username, password, role)
values
("admin", "$2a$10$FQu86C7r9lm9eBxyC5/MyOiJ7lnb1zmL.8ou1rJ4N1kik.2L0LRAW", "ADMIN");

insert into user
(username, password, role)
values
("user", "$2a$10$7vBOxO17g6yOA8liSe8NOOzVIXg1iQ2M/p2Pu.8/CQAtMbiEdr33e", "USER");

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
  "ADF-1121", 56000, "1975"),
("MG", "MG3", "Blue",
  "ZZZ-319", 13000, "2019"),
("Mazda", "6 estate", "Green",
  "ABC-7072", 34000, "2013");

 insert into car_owner
  (id, owner_id)
 values
  (1, 1),
  (2, 2),
  (3, 2);
