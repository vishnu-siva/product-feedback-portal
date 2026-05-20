-- Create database
CREATE DATABASE IF NOT EXISTS feedback_db;
USE feedback_db;

-- Table is auto-created by Spring Boot (Hibernate)
-- This is for reference only

CREATE TABLE IF NOT EXISTS feedbacks (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK ((rating >= 1) AND (rating <= 5)),
    created_at DATETIME(6),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- Sample data to test
INSERT INTO feedbacks (user_name, product_name, message, rating, created_at) VALUES
('Alice Johnson', 'SmartPhone X', 'Amazing product! The battery life is outstanding.', 5, NOW()),
('Bob Smith', 'Laptop Pro', 'Good performance but gets hot under heavy load.', 3, NOW()),
('Clara Lee', 'Wireless Earbuds', 'Great sound quality and very comfortable to wear.', 4, NOW()),
('David Kumar', 'Smart Watch', 'Looks great but the app needs improvement.', 3, NOW()),
('Emma Wilson', 'Tablet Max', 'Perfect for drawing and note-taking. Highly recommend!', 5, NOW());
