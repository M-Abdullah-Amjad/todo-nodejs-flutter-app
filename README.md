# Todo List API

A complete RESTful API for managing todo items with user authentication and full CRUD operations.

## Features

- ✅ User registration and authentication with JWT
- ✅ Create, Read, Update, Delete (CRUD) operations for todos
- ✅ Filter todos by status (pending, in-progress, completed)
- ✅ Secure authentication middleware
- ✅ MongoDB database with Mongoose ODM
- ✅ Input validation and error handling
- ✅ CORS support for frontend integration
- ✅ Production ready for Vercel deployment

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - Object Data Modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **body-parser** - Request body parsing
- **CORS** - Cross-Origin Resource Sharing

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/newTodoList
   JWT_SECRET=your-secret-key
   JWT_EXPIRE=24h
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set Environment Variables in Vercel Dashboard:**
   - Go to your project in Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add the following variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your JWT secret key
     - `JWT_EXPIRE`: Token expiration time (e.g., 24h)
     - `NODE_ENV`: production

## API Endpoints

### Authentication

#### Register User
```http
POST /register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Todo Operations (Require Authentication)

All todo endpoints require the `Authorization` header with a Bearer token: