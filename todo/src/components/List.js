import React from "react";
const List = ({ items, removeItem, editItem, completeItem }) => {
  return (
    <div className="todo-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="todo-item" key={id}>
            
            <div className="btn-container">
            <p className="title">{title}</p>
              <button type="button" className="edit-btn" onClick={() => editItem(id)}>
                edit
              </button>
              <button type="button" className="delete-btn" onClick={() => removeItem(id)}>
                complete
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;