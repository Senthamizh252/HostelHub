const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function seed() {
    console.log('Connecting to database...');
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
        });
        
        await connection.query('CREATE DATABASE IF NOT EXISTS hostelhub');
        await connection.query('USE hostelhub');

        // Read and execute schema
        const fs = require('fs');
        const path = require('path');
        const schema = fs.readFileSync(path.join(__dirname, '../database.sql'), 'utf8');
        
        // Execute multiple statements
        const statements = schema.split(';').filter(stmt => stmt.trim());
        for (let stmt of statements) {
            await connection.query(stmt);
        }
        console.log('Schema created successfully');

        // Clear existing data
        await connection.query('SET FOREIGN_KEY_CHECKS = 0');
        const tables = ['users', 'hostels', 'rooms', 'admins', 'wardens', 'students', 'complaints', 'leave_requests', 'announcements', 'mess_menu', 'mess_feedback', 'lost_found', 'notifications'];
        for (let table of tables) {
            await connection.query(`TRUNCATE TABLE ${table}`);
        }
        await connection.query('SET FOREIGN_KEY_CHECKS = 1');
        
        // Insert sample hostels
        await connection.query("INSERT INTO hostels (name, description) VALUES ('Block A - Boys', 'Boys hostel block A'), ('Block B - Girls', 'Girls hostel block B')");
        
        // Insert sample rooms
        await connection.query(`
            INSERT INTO rooms (hostel_id, room_number, floor, capacity, status) VALUES 
            (1, 'A-101', 1, 2, 'available'),
            (1, 'A-102', 1, 2, 'full'),
            (1, 'A-201', 2, 4, 'available'),
            (2, 'B-101', 1, 2, 'available')
        `);

        // Hash password
        const passwordHash = await bcrypt.hash('password123', 10);

        // Insert Admin
        const [adminUser] = await connection.query("INSERT INTO users (email, password_hash, role) VALUES ('admin@hostelhub.com', ?, 'admin')", [passwordHash]);
        await connection.query("INSERT INTO admins (user_id, name, phone) VALUES (?, 'Super Admin', '1234567890')", [adminUser.insertId]);

        // Insert Warden
        const [wardenUser] = await connection.query("INSERT INTO users (email, password_hash, role) VALUES ('warden@hostelhub.com', ?, 'warden')", [passwordHash]);
        await connection.query("INSERT INTO wardens (user_id, name, phone, hostel_id) VALUES (?, 'John Warden', '0987654321', 1)", [wardenUser.insertId]);

        // Insert Student
        const [studentUser] = await connection.query("INSERT INTO users (email, password_hash, role) VALUES ('student@hostelhub.com', ?, 'student')", [passwordHash]);
        await connection.query("INSERT INTO students (user_id, name, enrollment_number, phone, room_id) VALUES (?, 'Alice Student', 'STU001', '1122334455', 1)", [studentUser.insertId]);

        // Insert Complaints
        const [students] = await connection.query('SELECT id FROM students WHERE enrollment_number = "STU001"');
        const studentId = students[0].id;

        await connection.query(`
            INSERT INTO complaints (student_id, room_id, category, description, priority, status) VALUES 
            (?, 1, 'Electrical', 'Fan is not working in room', 'Medium', 'Pending'),
            (?, 1, 'Plumbing', 'Bathroom tap is leaking constantly', 'High', 'In Progress')
        `, [studentId, studentId]);

        // Insert Leave Requests
        await connection.query(`
            INSERT INTO leave_requests (student_id, start_date, end_date, reason, emergency_contact, status) VALUES 
            (?, '2026-10-01', '2026-10-05', 'Going home for festival', '9988776655', 'Pending')
        `, [studentId]);

        // Insert Announcements
        await connection.query(`
            INSERT INTO announcements (title, description, category, priority, created_by) VALUES 
            ('Maintenance Work', 'Water supply will be cut from 2 PM to 4 PM tomorrow.', 'Maintenance', 'High', ?)
        `, [wardenUser.insertId]);

        // Insert Mess Menu
        await connection.query(`
            INSERT INTO mess_menu (day_of_week, breakfast, lunch, snacks, dinner) VALUES 
            ('Monday', 'Idli, Sambar, Chutney', 'Rice, Dal, Mixed Veg, Papad', 'Tea, Samosa', 'Roti, Paneer Butter Masala, Rice'),
            ('Tuesday', 'Poha, Jalebi', 'Rice, Rajma, Aloo Gobi', 'Coffee, Biscuits', 'Roti, Dal Tadka, Jeera Rice')
        `);

        console.log('Demo data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seed();
