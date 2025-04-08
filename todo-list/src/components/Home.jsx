import { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";

function Home() {
    const [todo, setTodo] = useState([]);

    const fetchTodos = () => {
        axios
            .get("http://localhost:3001/todos")
            .then((res) => {
                setTodo(res.data); // Update the state with the fetched todos
            })
            .catch((err) => {
                console.log("Error fetching todos:", err);
            });
    };

    useEffect(() => {
        fetchTodos(); // Fetch todos when the component first loads
    }, []);

    return (
        <div className="home">
            <h2>Todo List</h2>
            <Create onTaskAdded={fetchTodos} />{" "}
            {/* Pass the fetchTodos function to Create */}
            {todo.length === 0 ? (
                <h2>No Record</h2>
            ) : (
                todo.map((todo) => <div key={todo._id}>{todo.task}</div>) // Display task from todo
            )}
        </div>
    );
}

export default Home;
