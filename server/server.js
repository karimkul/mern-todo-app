const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Todo = require("./models/todoModel");

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
    .connect(process.env.CLUSTER_SECRET)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((error) => console.error("❌ MongoDB connection error:", error));

// Middleware
app.use(cors());
app.use(express.json());

// POST /add - Create new todo
app.post("/add", (req, res) => {
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
});

// GET /todos - Fetch all todos
app.get("/todos", (req, res) => {
    Todo.find()
        .then((todos) => res.json(todos))
        .catch((err) =>
            res.status(500).json({ error: "Failed to fetch todos" })
        );
});

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
