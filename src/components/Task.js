import React, { useState } from "react";
import axios from "axios";
import "../css/task.css";

const Task = ({ listId, tasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tasks`,
        {
          title,
          description,
          dueDate,
          priority,
          listId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Task created:", response.data);
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Low");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="task-container">
      <form className="task-form" onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Create Task</button>
      </form>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-item">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>{task.dueDate}</p>
            <p>{task.priority}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
