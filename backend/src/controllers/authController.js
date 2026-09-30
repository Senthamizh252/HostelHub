const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mocked out DB functionality so the app works without MySQL connected
exports.register = async (req, res) => {
    try {
        // Just mock a success response for registration
        res.status(201).json({ message: 'User registered successfully (Mocked)' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Mock a user object depending on the email format (just for testing roles)
        let role = 'student';
        if (email.includes('warden')) role = 'warden';
        if (email.includes('admin')) role = 'admin';

        const token = jwt.sign(
            { userId: 1, role: role, email: email },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful (Mocked)',
            token,
            user: {
                id: 1,
                email: email,
                role: role,
                name: 'Mock User',
                profile: {}
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

exports.getMe = async (req, res) => {
    try {
        res.json({
            user: {
                id: 1,
                email: req.user?.email || 'mock@example.com',
                role: req.user?.role || 'student',
                name: 'Mock User',
                profile: {}
            }
        });
    } catch (error) {
        console.error('GetMe Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
