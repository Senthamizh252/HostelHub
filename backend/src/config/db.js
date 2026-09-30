// const mysql = require('mysql2/promise');
require('dotenv').config();

/* 
// Disabled database connection as requested
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hostelhub',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
*/

// Mock database pool to prevent crashes when UI calls APIs
const mockConnection = {
    query: async () => [[{ insertId: 1, id: 1 }]],
    beginTransaction: async () => {},
    commit: async () => {},
    rollback: async () => {},
    release: () => {}
};

const pool = {
    query: async () => [[{ id: 1, role: 'student', name: 'Mock User' }]],
    getConnection: async () => mockConnection
};

module.exports = pool;
