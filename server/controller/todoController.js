const Todo = require("../models/todoModel");

// GET /todos - Fetch all todos
const getTodos = (req, res) => {
    Todo.find()
        .then((todos) => res.json(todos))
        .catch((err) =>
            res.status(500).json({ error: "Failed to fetch todos" })
        );
};

// POST /add - Create new todo
const createTodo = (req, res) => {
    console.log("📥 Incoming data:", req.body);
    const task = req.body.task;

    if (!task) {
        return res.status(400).json({ message: "Task is required" });
    }

    Todo.create({ task })
        .then((result) => res.status(201).json(result))
        .catch((err) => {
            console.error("❌ Error creating todo:", err);
            res.status(500).json({ error: "Something went wrong" });
        });
};

// DELETE /todos - Delete todo
const deleteTodo = (req, res) => {
    const id = req.params.id;

    Todo.findByIdAndDelete(id)
        .then(() => res.json({ message: "Todo deleted successfully" }))
        .catch((err) =>
            res
                .status(500)
                .json({ error: "Failed to delete todo", details: err })
        );
};

module.exports = { createTodo, getTodos, deleteTodo };
