import React, { useState, useEffect } from "react";
import List from "./components/List";
import getLocalStorage from "./components/LocalStg";
import "./App.css";


function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };

  const clearList = () => {
    setList([]);
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };
  
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="todo-form" onSubmit={handleSubmit}>

        <h3>Todo List</h3>
        <div className="form-control">
          <input type="text" className="todo" placeholder="Add to List" value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "Submit!"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="todo-container">
          <List items={list} removeItem={ removeItem } editItem={ editItem }/>
          <button className="clear-btn" onClick={ clearList }>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;