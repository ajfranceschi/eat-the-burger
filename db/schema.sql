### SCHEMA

CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers (
    id SERIAL PRIMARY KEY,
    burger_name VARCHAR(50) NOT NULL,
    devoured BOOL NOT NULL DEFAULT 0
);