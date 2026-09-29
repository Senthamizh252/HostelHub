const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

exports.register = async (req, res) => {
    const { email, password, role, name, phone, extra_info } = req.body;
    // extra_info can be enrollment_number for student, hostel_id for warden

    try {
        const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            const [userResult] = await connection.query(
                'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
                [email, hashedPassword, role]
            );
            const userId = userResult.insertId;

            if (role === 'student') {
                await connection.query(
                    'INSERT INTO students (user_id, name, enrollment_number, phone) VALUES (?, ?, ?, ?)',
                    [userId, name, extra_info, phone]
                );
            } else if (role === 'warden') {
                await connection.query(
                    'INSERT INTO wardens (user_id, name, phone, hostel_id) VALUES (?, ?, ?, ?)',
                    [userId, name, phone, extra_info || null]
                );
            } else if (role === 'admin') {
                await connection.query(
                    'INSERT INTO admins (user_id, name, phone) VALUES (?, ?, ?)',
                    [userId, name, phone]
                );
            }

            await connection.commit();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        let profile = null;
        if (user.role === 'student') {
            const [students] = await pool.query('SELECT * FROM students WHERE user_id = ?', [user.id]);
            profile = students[0];
        } else if (user.role === 'warden') {
            const [wardens] = await pool.query('SELECT * FROM wardens WHERE user_id = ?', [user.id]);
            profile = wardens[0];
        } else if (user.role === 'admin') {
            const [admins] = await pool.query('SELECT * FROM admins WHERE user_id = ?', [user.id]);
            profile = admins[0];
        }

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                profile
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

exports.getMe = async (req, res) => {
    try {
        const [users] = await pool.query('SELECT id, email, role FROM users WHERE id = ?', [req.user.userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = users[0];
        let profile = null;
        
        if (user.role === 'student') {
            const [students] = await pool.query(`
                SELECT s.*, r.room_number, h.name as hostel_name 
                FROM students s 
                LEFT JOIN rooms r ON s.room_id = r.id 
                LEFT JOIN hostels h ON r.hostel_id = h.id 
                WHERE s.user_id = ?
            `, [user.id]);
            profile = students[0];
        } else if (user.role === 'warden') {
            const [wardens] = await pool.query(`
                SELECT w.*, h.name as hostel_name 
                FROM wardens w 
                LEFT JOIN hostels h ON w.hostel_id = h.id 
                WHERE w.user_id = ?
            `, [user.id]);
            profile = wardens[0];
        } else if (user.role === 'admin') {
            const [admins] = await pool.query('SELECT * FROM admins WHERE user_id = ?', [user.id]);
            profile = admins[0];
        }

        res.json({
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                profile
            }
        });
    } catch (error) {
        console.error('GetMe Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
