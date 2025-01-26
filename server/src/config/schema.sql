DROP DATABASE IF EXISTS petprops_db;

CREATE DATABASE petprops_db;

\c petprops_db

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE adoption_forms (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    pet_id VARCHAR(50) UNIQUE NOT NULL,
    pet_name VARCHAR(100) NOT NULL,
    pet_type VARCHAR(100) NOT NULL,
    pet_breed VARCHAR(100) NOT NULL,
    pet_age INTEGER NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(100) DEFAULT 'pending',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_saved_pets (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    pet_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, pet_id)
);

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age VARCHAR(50) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    species VARCHAR(50) NOT NULL,
    breed_primary VARCHAR(255) NOT NULL,
    breed_secondary VARCHAR(255),
    breed_mixed BOOLEAN NOT NULL,
    photos JSONB NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL
);
