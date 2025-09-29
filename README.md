# EverLearners - Educational Gaming Platform

A full-stack educational gaming platform with user authentication and interactive learning games.

## Features

- **User Registration** - Sign up with name, email, password, mobile number, and class
- **Smart Login Detection** - Automatically detects existing users and prompts for login
- **Secure Authentication** - Backend validation and user management
- **Interactive Games** - Educational games starting with Photosynthesis
- **Guest Access** - Play without registration

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Backend Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

3. **Server Details**
   - Server runs on: `http://localhost:3000`
   - API endpoints available at: `http://localhost:3000/api/`
   - User data stored in: `users.json`

### Frontend Access

1. **Open in Browser**
   - Navigate to: `http://localhost:3000`
   - Or double-click `game.html` after server is running

## API Endpoints

### POST /api/signup
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "password123",
  "mobile": "1234567890",
  "className": "10"
}
```

### POST /api/login
Login existing user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### POST /api/check-email
Check if email already exists
```json
{
  "email": "john@example.com"
}
```

### GET /api/users
Get all registered users (development only)

## File Structure

```
├── server.js          # Backend Express server
├── game.html          # Frontend HTML
├── styles.css         # Frontend CSS
├── package.json       # Node.js dependencies
├── users.json         # User database (auto-created)
├── logo.jpg          # Application logo
└── README.md         # This file
```

## User Data Fields

- **Name**: Full name of the user
- **Email**: Unique email address for login
- **Password**: User password (stored as plain text - for production, implement hashing)
- **Mobile**: 10-digit mobile number
- **Class**: Educational level (6-12, College, Other)

## Development Features

- **Auto Email Check**: Detects existing emails on blur
- **Form Validation**: Client and server-side validation
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on all screen sizes
- **Guest Mode**: Play without registration

## Production Notes

⚠️ **Security Notice**: This is a development version. For production:
- Implement password hashing (bcrypt)
- Add input sanitization
- Use a proper database (MongoDB, PostgreSQL)
- Add rate limiting
- Implement proper session management
- Add HTTPS support

## Troubleshooting

**Server not starting?**
- Ensure Node.js is installed
- Run `npm install` to install dependencies
- Check if port 3000 is available

**Cannot connect to backend?**
- Ensure server is running on http://localhost:3000
- Check browser console for CORS errors
- Verify API_BASE_URL in frontend code

**Game not loading?**
- Make sure to access via http://localhost:3000, not file://
- Check browser console for JavaScript errors

## License

MIT License - Feel free to use for educational purposes.