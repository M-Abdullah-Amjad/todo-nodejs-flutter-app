const TodoServices = require("../services/todo_services");

exports.createTodo = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;
        const userId = req.user.userId;

        if (!title) {
            return res.status(400).json({ 
                message: 'Title is required', 
                status: false 
            });
        }

        const todoData = { title, description, status };
        const todo = await TodoServices.createTodo(todoData, userId);
        
        res.status(201).json({ 
            message: 'Todo created successfully', 
            todo, 
            status: true 
        });
        
    } catch (error) {
        console.error('Error in create todo controller:', error);
        res.status(500).json({ 
            message: 'Internal server error', 
            error: error.message, 
            status: false 
        });
    }
};

exports.getAllTodos = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const todos = await TodoServices.getAllTodos(userId);
        
        res.status(200).json({ 
            message: 'Todos fetched successfully', 
            todos, 
            status: true 
        });
        
    } catch (error) {
        console.error('Error in get all todos controller:', error);
        res.status(500).json({ 
            message: 'Internal server error', 
            error: error.message, 
            status: false 
        });
    }
};

exports.getTodoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        
        const todo = await TodoServices.getTodoById(id, userId);
        
        res.status(200).json({ 
            message: 'Todo fetched successfully', 
            todo, 
            status: true 
        });
        
    } catch (error) {
        console.error('Error in get todo by id controller:', error);
        
        if (error.message === 'Todo not found') {
            return res.status(404).json({ 
                message: 'Todo not found', 
                status: false 
            });
        }
        
        res.status(500).json({ 
            message: 'Internal server error', 
            error: error.message, 
            status: false 
        });
    }
};

exports.updateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const userId = req.user.userId;

        if (!title) {
            return res.status(400).json({ 
                message: 'Title is required', 
                status: false 
            });
        }

        const updateData = { title, description, status };
        const todo = await TodoServices.updateTodo(id, updateData, userId);
        
        res.status(200).json({ 
            message: 'Todo updated successfully', 
            todo, 
            status: true 
        });
        
    } catch (error) {
        console.error('Error in update todo controller:', error);
        
        if (error.message === 'Todo not found') {
            return res.status(404).json({ 
                message: 'Todo not found', 
                status: false 
            });
        }
        
        res.status(500).json({ 
            message: 'Internal server error', 
            error: error.message, 
            status: false 
        });
    }
};

exports.deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        
        const todo = await TodoServices.deleteTodo(id, userId);
        
        res.status(200).json({ 
            message: 'Todo deleted successfully', 
            todo, 
            status: true 
        });
        
    } catch (error) {
        console.error('Error in delete todo controller:', error);
        
        if (error.message === 'Todo not found') {
            return res.status(404).json({ 
                message: 'Todo not found', 
                status: false 
            });
        }
        
        res.status(500).json({ 
            message: 'Internal server error', 
            error: error.message, 
            status: false 
        });
    }
};

exports.getTodosByStatus = async (req, res, next) => {
    try {
        const { status } = req.params;
        const userId = req.user.userId;
        
        const validStatuses = ['pending', 'in-progress', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                message: 'Invalid status. Must be pending, in-progress, or completed', 
                status: false 
            });
        }
        
        const todos = await TodoServices.getTodosByStatus(status, userId);
        
        res.status(200).json({ 
            message: `Todos with status '${status}' fetched successfully`, 
            todos, 
            status: true 
        });
        
    } catch (error) {
        console.error('Error in get todos by status controller:', error);
        res.status(500).json({ 
            message: 'Internal server error', 
            error: error.message, 
            status: false 
        });
    }
}; 