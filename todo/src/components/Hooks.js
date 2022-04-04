import React, { useState, useEffect } from "react";
import List from "./List";
import getLocalStorage from "./LocalStg";

function Hooks() {
    const [name, setName] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [list, setList] = useState(getLocalStorage());
    const [editID, setEditID] = useState(null);
    const [isComplete, setComplete] = useState(false)
    
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

    const completeItem = (id) => {
        const specificItem = list.find((item) => item.id === id);
        if(setComplete !== true){
            console.log(specificItem.title)
            specificItem.title.style.textDecoration = "line-through";
            isComplete(true)
        }
    }
  
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
            <input type="text" className="todo" placeholder="Enter todo.." value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit" className="submit-btn">
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="todo-container">
            <List items={list} removeItem={ removeItem } editItem={ editItem } completeItem={ completeItem } />
            <button className="clear-btn" onClick={ clearList }>
              clear items
            </button>
          </div>
        )}
      </section>
    );
  }
  export default Hooks;