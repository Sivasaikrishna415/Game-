const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files (HTML, CSS, JS)

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// Helper function to read users
function readUsers() {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
}

// Helper function to write users
function writeUsers(users) {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing users file:', error);
        return false;
    }
}

// API Routes

// Check if email already exists
app.post('/api/check-email', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const users = readUsers();
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
        return res.json({ 
            exists: true, 
            message: 'Email already registered! Please login instead.',
            user: {
                name: existingUser.name,
                email: existingUser.email
            }
        });
    }

    res.json({ exists: false });
});

// User signup
app.post('/api/signup', (req, res) => {
    const { name, email, password, mobile, className } = req.body;

    // Validate required fields
    if (!name || !email || !password || !mobile || !className) {
        return res.status(400).json({ 
            error: 'All fields are required',
            missing: {
                name: !name,
                email: !email,
                password: !password,
                mobile: !mobile,
                className: !className
            }
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate mobile number (basic validation)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
        return res.status(400).json({ error: 'Mobile number must be 10 digits' });
    }

    const users = readUsers();
    
    // Check if user already exists
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return res.status(409).json({ 
            error: 'Email already registered',
            message: 'This email is already registered. Please login instead.'
        });
    }

    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password, // In production, this should be hashed
        mobile: mobile.trim(),
        className: className.trim(),
        createdAt: new Date().toISOString(),
        lastLogin: null
    };

    users.push(newUser);
    
    if (writeUsers(users)) {
        res.status(201).json({
            success: true,
            message: 'Account created successfully!',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                className: newUser.className
            }
        });
    } else {
        res.status(500).json({ error: 'Failed to create account. Please try again.' });
    }
});

// User login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = readUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    writeUsers(users);

    res.json({
        success: true,
        message: 'Login successful!',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            className: user.className
        }
    });
});

// Get all users (for development/testing)
app.get('/api/users', (req, res) => {
    const users = readUsers();
    // Remove passwords before sending
    const safeUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        className: user.className,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
    }));
    res.json(safeUsers);
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'game.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 EverLearners server running at http://localhost:${PORT}`);
    console.log(`📁 Users data will be stored in: ${USERS_FILE}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down server gracefully...');
    process.exit(0);
});