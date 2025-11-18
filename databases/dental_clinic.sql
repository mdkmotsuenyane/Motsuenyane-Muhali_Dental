
-- 1️⃣ Create the database
CREATE DATABASE IF NOT EXISTS dental_clinic;

-- 2️⃣ Use the database
USE dental_clinic;

-- 3️⃣ Create the appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- unique ID for each appointment
    full_name VARCHAR(100) NOT NULL,        -- patient's full name
    email VARCHAR(100) NOT NULL,            -- email address
    cellphone VARCHAR(20) NOT NULL,         -- phone number
    appointment_date DATE NOT NULL,         -- appointment date
    appointment_time TIME NOT NULL,         -- appointment time
    service VARCHAR(100),                   -- selected service
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- automatically logs submission time
);

-- 4️⃣ Insert sample data
INSERT INTO appointments (full_name, email, cellphone, appointment_date, appointment_time, service)
VALUES
('John Doe', 'john@example.com', '0821234567', '2025-11-06', '09:30:00', 'Teeth Cleaning'),
('Jane Smith', 'jane@example.com', '0839876543', '2025-11-07', '11:00:00', 'Root Canal Treatment'),
('Mark Johnson', 'mark@example.com', '0841122334', '2025-11-08', '14:15:00', 'Orthodontics (Braces)');

-- 5️⃣ View the table contents
SELECT * FROM appointments;
