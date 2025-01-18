    DROP DATABASE IF EXISTS petprops_db;
    
    CREATE DATABASE petprops_db;
    
    CREATE TABLE user (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE adoption_forms (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
        user_name VARCHAR(100) NOT NULL,
        user_address VARCHAR(100) NOT NULL,
        user_phone VARCHAR(100) NOT NULL,
        user_email VARCHAR(100) NOT NULL,
        pet_id INTEGER NOT NULL,
        pet_name VARCHAR(100) NOT NULL,
        pet_type VARCHAR(100) NOT NULL,
        pet_breed VARCHAR(100) NOT NULL,
        pet_age INTEGER NOT NULL,
        reason TEXT NOT NULL,
        status VARCHAR(100) DEFAULT 'pending',
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )