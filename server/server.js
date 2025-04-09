const express = require("express");
const cors = require("cors");

const Todo = require("./models/todoModel");
const connectDB = require("./config/db");
require("dotenv").config();

const {
    getTodos,
    createTodo,
    deleteTodo
} = require("./controller/todoController");

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/todos", getTodos);
app.post("/add", createTodo);
app.delete("/delete/:id", deleteTodo);

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
