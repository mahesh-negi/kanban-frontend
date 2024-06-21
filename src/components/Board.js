import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";
import "../css/board.css";

const Board = () => {
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");
  console.log("token:::", token);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token:::", token);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/boards`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setBoards(response.data);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("token:::", token);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/boards`,
        { name },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setBoards([...boards, response.data]);
      setName("");
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  return (
    <div className="board-container">
      <form onSubmit={handleCreateBoard}>
        <input
          type="text"
          placeholder="Board Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Create Board</button>
      </form>
      <div className="board-lists">
        {boards.map((board) => (
          <div key={board._id} className="board-item">
            <h2>{board.name}</h2>
            <List boardId={board._id} lists={board.lists} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
