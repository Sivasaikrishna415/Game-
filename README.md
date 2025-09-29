# EverLearners Backend

🛠️ **Node.js Authentication & API Server**

This folder contains the complete server-side infrastructure for the EverLearners educational platform, providing secure user authentication, data management, and API services.

---

## 📁 File Structure

```
backend/
├── server.js              # Main Express server application
├── package.json           # Node.js project configuration
├── package-lock.json      # Dependency version lock file
├── users.json             # User database (JSON format)
├── node_modules/          # Installed npm dependencies
└── README.md              # This documentation
```

---

## 🗂️ Detailed File Descriptions

### 🖥️ Server Files

#### **server.js** (Main Application Server)
- **Purpose**: Core Express.js server handling all backend operations
- **Port**: Runs on `http://localhost:3000`
- **Architecture**: RESTful API design with JSON responses
- **Features**:
  - Express.js web framework integration
  - CORS middleware for cross-origin requests
  - Body parser for JSON request handling
  - File system operations for user data management
  - Error handling and validation middleware
  - Logging and request monitoring

#### **package.json** (Project Configuration)
- **Purpose**: Node.js project metadata and dependency management
- **Contains**:
  - Project information and version
  - Dependency specifications
  - npm scripts for server management
  - Node.js version compatibility
- **Scripts Available**:
  - `npm start`: Launch the server
  - `npm install`: Install all dependencies

#### **package-lock.json** (Dependency Lock File)
- **Purpose**: Ensures consistent dependency versions across environments
- **Features**:
  - Exact version specifications
  - Dependency tree locking
  - Security vulnerability tracking
  - Build reproducibility

### 💾 Data Management

#### **users.json** (User Database)
- **Purpose**: JSON-based user account storage
- **Structure**:
  ```json
  {
    "users": [
      {
        "id": "unique_user_id",
        "email": "user@example.com",
        "password": "hashed_password",
        "name": "User Name",
        "createdAt": "2025-09-29T00:00:00.000Z",
        "lastLogin": "2025-09-29T00:00:00.000Z"
      }
    ]
  }
  ```
- **Features**:
  - Persistent user storage
  - JSON format for easy manipulation
  - Automatic file creation if missing
  - Backup and recovery support

### 📦 Dependencies

#### **node_modules/** (Installed Packages)
- **Purpose**: Contains all installed npm dependencies
- **Management**: Automatically managed by npm
- **Size**: Varies based on dependency tree
- **Exclusion**: Should be excluded from version control

---

## 🔌 API Endpoints

### Authentication Endpoints

#### **POST /signup** (User Registration)
- **Purpose**: Register new user accounts
- **Request Body**:
  ```json
  {
    "name": "User Full Name",
    "email": "user@example.com",
    "password": "secure_password"
  }
  ```
- **Response Success** (201):
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "generated_id",
      "name": "User Full Name",
      "email": "user@example.com"
    }
  }
  ```
- **Response Error** (400):
  ```json
  {
    "error": "User already exists"
  }
  ```
- **Features**:
  - Email uniqueness validation
  - Password strength requirements
  - Automatic user ID generation
  - Input sanitization and validation
  - Duplicate email prevention

#### **POST /signin** (User Authentication)
- **Purpose**: Authenticate existing users
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "user_password"
  }
  ```
- **Response Success** (200):
  ```json
  {
    "message": "Sign in successful",
    "user": {
      "id": "user_id",
      "name": "User Full Name",
      "email": "user@example.com"
    }
  }
  ```
- **Response Error** (401):
  ```json
  {
    "error": "Invalid credentials"
  }
  ```
- **Features**:
  - Credential verification
  - Last login timestamp update
  - Secure authentication flow
  - Error handling for invalid attempts

### Health Check Endpoints

#### **GET /** (Server Status)
- **Purpose**: Verify server availability
- **Response**: Basic server information and status
- **Usage**: Health monitoring and connectivity testing

---

## 📚 Core Dependencies

### Production Dependencies

#### **Express.js** (Web Framework)
- **Version**: Latest stable
- **Purpose**: Core web application framework
- **Features**:
  - HTTP server functionality
  - Routing and middleware support
  - Request/response handling
  - Static file serving capability

#### **Body-parser** (Request Parsing)
- **Version**: Latest stable
- **Purpose**: Parse incoming request bodies
- **Features**:
  - JSON payload parsing
  - URL-encoded form data handling
  - Raw and text parsing support
  - Size limit configuration

#### **CORS** (Cross-Origin Resource Sharing)
- **Version**: Latest stable
- **Purpose**: Enable cross-origin requests
- **Features**:
  - Frontend-backend communication
  - Configurable origin policies
  - Preflight request handling
  - Security header management

### Development Dependencies
- **Nodemon** (Optional): Auto-restart server during development
- **ESLint** (Optional): Code quality and style checking
- **Jest** (Optional): Unit testing framework

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: Version 14.x or higher
- **npm**: Version 6.x or higher (included with Node.js)
- **Operating System**: Windows, macOS, or Linux

### Installation Steps

1. **Navigate to Backend Directory**
   ```powershell
   cd backend
   ```

2. **Install Dependencies**
   ```powershell
   npm install
   ```

3. **Start the Server**
   ```powershell
   node server.js
   ```

4. **Verify Installation**
   - Server should start on `http://localhost:3000`
   - Check console for "Server is running" message
   - Test API endpoints using browser or API client

### Alternative Start Methods

#### Development Mode (with auto-restart)
```powershell
# Install nodemon globally (optional)
npm install -g nodemon

# Start with nodemon
nodemon server.js
```

#### Production Mode
```powershell
# Set production environment
$env:NODE_ENV="production"
node server.js
```

---

## 🔧 Configuration Options

### Environment Variables
- **PORT**: Server port (default: 3000)
- **NODE_ENV**: Environment mode (development/production)
- **DB_PATH**: Path to user database file
- **CORS_ORIGIN**: Allowed frontend origins

### Server Configuration
```javascript
// server.js configuration options
const config = {
  port: process.env.PORT || 3000,
  cors: {
    origin: 'http://localhost:*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  },
  database: {
    path: './users.json',
    autoBackup: true
  }
};
```

---

## 🛡️ Security Features

### Data Protection
- **Input Validation**: All user inputs are validated and sanitized
- **SQL Injection Prevention**: JSON-based storage eliminates SQL injection risks
- **XSS Protection**: Output encoding and validation
- **CORS Security**: Configured cross-origin policies

### Authentication Security
- **Password Handling**: Secure password storage (ready for hashing implementation)
- **Email Validation**: Format and existence checking
- **Duplicate Prevention**: Unique email enforcement
- **Error Handling**: Secure error messages without sensitive information

### Future Security Enhancements
- **Password Hashing**: bcrypt integration for secure password storage
- **JWT Tokens**: JSON Web Tokens for session management
- **Rate Limiting**: API request throttling
- **HTTPS Support**: SSL/TLS encryption
- **Input Sanitization**: Enhanced data cleaning

---

## 📊 Monitoring & Logging

### Server Monitoring
- **Console Logging**: Request and error logging
- **Health Checks**: Server status monitoring
- **Error Tracking**: Comprehensive error handling

### Performance Metrics
- **Response Times**: API endpoint performance tracking
- **Request Volume**: Traffic monitoring capabilities
- **Error Rates**: Failure tracking and analysis

---

## 🧪 Testing

### Manual Testing
1. **Start Server**: `node server.js`
2. **Test Endpoints**: Use browser or API testing tools
3. **Verify Responses**: Check JSON response formats
4. **Database Operations**: Confirm user data persistence

### API Testing Examples

#### Test User Registration
```bash
# Using curl (if available)
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"testpass123"}'
```

#### Test User Authentication
```bash
# Using curl (if available)
curl -X POST http://localhost:3000/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'
```

### Automated Testing (Future)
- **Unit Tests**: Individual function testing
- **Integration Tests**: API endpoint testing
- **Load Tests**: Performance under stress
- **Security Tests**: Vulnerability scanning

---

## 🔄 Database Management

### User Data Structure
```json
{
  "users": [
    {
      "id": "user_123456789",
      "name": "John Doe",
      "email": "john@example.com",
      "password": "secure_password",
      "createdAt": "2025-09-29T10:30:00.000Z",
      "lastLogin": "2025-09-29T14:15:00.000Z",
      "preferences": {
        "theme": "light",
        "notifications": true
      },
      "progress": {
        "completedGames": [],
        "badges": [],
        "totalScore": 0
      }
    }
  ]
}
```

### Database Operations
- **Create**: Add new user records
- **Read**: Retrieve user information
- **Update**: Modify user data (future feature)
- **Delete**: Remove user accounts (future feature)

### Backup & Recovery
- **Manual Backup**: Copy `users.json` file
- **Automatic Backup**: Planned feature for production
- **Data Migration**: Tools for database updates

---

## 🚦 Error Handling

### Error Types
- **Validation Errors**: Invalid input data
- **Authentication Errors**: Login failures
- **Database Errors**: File system issues
- **Server Errors**: Internal server problems

### Error Response Format
```json
{
  "error": "Error description",
  "code": "ERROR_CODE",
  "timestamp": "2025-09-29T12:00:00.000Z",
  "details": "Additional error information"
}
```

---

## 🔮 Future Enhancements

### Planned Features
- **User Profiles**: Extended user information and preferences
- **Game Progress Tracking**: Learning analytics and progress storage
- **Achievement System**: Badge and reward management
- **Real-time Features**: WebSocket support for live interactions
- **Advanced Authentication**: OAuth integration, 2FA
- **Database Migration**: PostgreSQL or MongoDB integration
- **API Documentation**: Swagger/OpenAPI documentation
- **Microservices**: Service decomposition for scalability

### Technical Improvements
- **TypeScript**: Type safety and better development experience
- **Docker**: Containerized deployment
- **CI/CD**: Automated testing and deployment pipelines
- **Monitoring**: Advanced logging and metrics collection
- **Caching**: Redis integration for performance
- **Load Balancing**: Multiple server instance support

---

## 📋 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - **Solution**: Change port in server.js or kill existing process
   - **Command**: `netstat -ano | findstr :3000`

2. **Module Not Found**
   - **Solution**: Run `npm install` to install dependencies
   - **Check**: Verify `node_modules` directory exists

3. **CORS Errors**
   - **Solution**: Check frontend URL matches CORS configuration
   - **Update**: Modify CORS settings in server.js

4. **Database File Issues**
   - **Solution**: Check file permissions and directory access
   - **Reset**: Delete `users.json` to recreate empty database

### Debug Mode
```powershell
# Enable detailed logging
$env:DEBUG="*"
node server.js
```

---

## 📞 Support & Documentation

For technical support, feature requests, or bug reports, refer to the main project documentation or contact the development team.

**Server Version**: 1.0.0  
**Node.js Compatibility**: 14.x+  
**Last Updated**: September 2025  
**API Version**: v1  
**Platform**: EverLearners Educational System Backend