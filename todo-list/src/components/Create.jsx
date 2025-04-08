import { useState } from "react";
import axios from "axios";

function Create({ onTaskAdded }) {
    const [task, setTask] = useState(""); // Initialize task as an empty string

    const handleAdd = () => {
        if (!task) return alert("Please enter a task!"); // Make sure task is not empty
        axios
            .post("http://localhost:3001/add", { task })
            .then((res) => {
                console.log("Task added:", res.data);
                setTask(""); // Clear input after adding
                onTaskAdded(); // Notify parent to refresh the todos list
            })
            .catch((err) => console.log("Error: ", err));
    };

    return (
        <div className="create_form">
            <input
                value={task} // Ensure the value is controlled
                onChange={(e) => setTask(e.target.value)}
                type="text"
                placeholder="Enter Task"
            />
            <button onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Create;
