CREATE DATABASE IF NOT EXISTS coffeeshop;

USE coffeeshop;

CREATE TABLE IF NOT EXISTS employee(
	id VARCHAR(9) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL CONSTRAINT email_address_validation CHECK (email_address REGEXP "^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]*?[a-zA-Z0-9._-]?@[a-zA-Z0-9][a-zA-Z0-9._-]*?[a-zA-Z0-9]?\\.[a-zA-Z]{2,63}$"),
    phone_number VARCHAR(8) NOT NULL CONSTRAINT phone_number_length CHECK (LENGTH(phone_number) = 8),
    gender VARCHAR(10) NOT NULL,
    cafe_location VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS cafe(
	id VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    logo VARCHAR(1024) NOT NULL,
    location VARCHAR(40) NOT NULL
);

INSERT INTO employee(id, name, email_address, phone_number, gender, cafe_location, start_date) VALUES ('UI1A2B3C4', 'John Doe', 'johndoe@gmail.com','81237898', 'Male', 'e57dd025-95f3-41e8-ab5c-0ce7062d257d', '2023-12-12');
INSERT INTO employee(id, name, email_address, phone_number, gender, cafe_location, start_date) VALUES ('UI1A2B3C5', 'James Peralta', 'jamesperalta@gmail.com', '81237894', 'Male', 'dd77980c-134a-47a1-97f6-cd764055e292', '2023-11-10');

INSERT INTO cafe(id, name, description, logo, location) VALUES ('e57dd025-95f3-41e8-ab5c-0ce7062d257d', 'Cafe MBS', 'Coffee Shop by the Bay', 'mbs.png', 'C');
INSERT INTO cafe(id, name, description, logo, location) VALUES ('dd77980c-134a-47a1-97f6-cd764055e292', 'Cafe Eastcoast', 'Coffee Shop by the Coast', 'coast.png', 'SE');
