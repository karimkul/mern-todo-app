import { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

function Home() {
    const [todo, setTodo] = useState([]);

    const fetchTodos = () => {
        axios
            .get("http://localhost:3001/todos")
            .then((res) => {
                setTodo(res.data);
            })
            .catch((err) => {
                console.log("Error fetching todos:", err);
            });
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3001/delete/${id}`)
            .then(() => {
                console.log("Todo deleted");
                fetchTodos();
            })
            .catch((err) => console.log("Delete error:", err));
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="home">
            <h1>Todo List</h1>
            <Create onTaskAdded={fetchTodos} />

            {todo.length === 0 ? (
                <h2>No Record</h2>
            ) : (
                todo.map((todo) => (
                    <div className="task" key={todo._id}>
                        <p>{todo.task.toUpperCase()}</p>
                        <span>
                            <RiDeleteBin6Line
                                onClick={() => handleDelete(todo._id)}
                            />
                        </span>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;
