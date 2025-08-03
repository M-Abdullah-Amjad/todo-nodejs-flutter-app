const TodoModel = require("../model/todo_model");

class TodoServices {
    static async createTodo(todoData, userId) {
        try {
            const todo = new TodoModel({
                ...todoData,
                user: userId
            });
            return await todo.save();
        } catch (error) {
            console.error('Error creating todo:', error);
            throw new Error('Todo creation failed');
        }
    }

    static async getAllTodos(userId) {
        try {
            return await TodoModel.find({ user: userId }).sort({ createdAt: -1 });
        } catch (error) {
            console.error('Error fetching todos:', error);
            throw new Error('Failed to fetch todos');
        }
    }

    static async getTodoById(todoId, userId) {
        try {
            const todo = await TodoModel.findOne({ _id: todoId, user: userId });
            if (!todo) {
                throw new Error('Todo not found');
            }
            return todo;
        } catch (error) {
            console.error('Error fetching todo:', error);
            throw error;
        }
    }

    static async updateTodo(todoId, updateData, userId) {
        try {
            const todo = await TodoModel.findOneAndUpdate(
                { _id: todoId, user: userId },
                updateData,
                { new: true, runValidators: true }
            );
            
            if (!todo) {
                throw new Error('Todo not found');
            }
            
            return todo;
        } catch (error) {
            console.error('Error updating todo:', error);
            throw error;
        }
    }

    static async deleteTodo(todoId, userId) {
        try {
            const todo = await TodoModel.findOneAndDelete({ _id: todoId, user: userId });
            
            if (!todo) {
                throw new Error('Todo not found');
            }
            
            return todo;
        } catch (error) {
            console.error('Error deleting todo:', error);
            throw error;
        }
    }

    static async getTodosByStatus(status, userId) {
        try {
            return await TodoModel.find({ status, user: userId }).sort({ createdAt: -1 });
        } catch (error) {
            console.error('Error fetching todos by status:', error);
            throw new Error('Failed to fetch todos by status');
        }
    }
}

module.exports = TodoServices; 