const router = require('express').Router();
const TodoController = require('../controller/todo_controller');
const { authenticateToken } = require('../middleware/auth_middleware');

// Apply authentication middleware to all todo routes
router.use(authenticateToken);

// Create a new todo
router.post('/todos', TodoController.createTodo);

// Get all todos for the authenticated user
router.get('/todos', TodoController.getAllTodos);

// Get todos by status (must come before /todos/:id)
router.get('/todos/status/:status', TodoController.getTodosByStatus);

// Get a specific todo by ID
router.get('/todos/:id', TodoController.getTodoById);

// Update a todo
router.put('/todos/:id', TodoController.updateTodo);

// Delete a todo
router.delete('/todos/:id', TodoController.deleteTodo);

module.exports = router; 