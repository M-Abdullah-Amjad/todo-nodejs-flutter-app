const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 3000;

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`�� Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📝 API Documentation:`);
  console.log(`   POST /register - Register a new user`);
  console.log(`   POST /login - Login user`);
  console.log(`   POST /todos - Create a new todo (requires auth)`);
  console.log(`   GET /todos - Get all todos (requires auth)`);
  console.log(`   GET /todos/:id - Get specific todo (requires auth)`);
  console.log(`   PUT /todos/:id - Update todo (requires auth)`);
  console.log(`   DELETE /todos/:id - Delete todo (requires auth)`);
  console.log(`   GET /todos/status/:status - Get todos by status (requires auth)`);
});