import React, { useState } from "react";
import axios from "axios";
import Task from "./Task";
import "../css/list.css";

const List = ({ boardId, lists }) => {
  const [name, setName] = useState("");

  const handleCreateList = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/lists`,
        { name, boardId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setName("");
      console.log("List created:", response.data);
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  return (
    <div className="list-container">
      <form className="list-form" onSubmit={handleCreateList}>
        <input
          type="text"
          placeholder="List Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="list-input"
        />
        <button type="submit" className="list-button">
          Create List
        </button>
      </form>
      <div className="list-items">
        {lists.map((list) => (
          <div key={list._id} className="list-item">
            <h3 className="list-item-title">{list.name}</h3>
            <Task listId={list._id} tasks={list.tasks} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
