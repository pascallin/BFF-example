import React from 'react'

const TodoListItem = ({ id, title }) => {
  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
          />
          <div className="todo-text">{title}</div>
        </div>
        <div className="segment buttons">
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
