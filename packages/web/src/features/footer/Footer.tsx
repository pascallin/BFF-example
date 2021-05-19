import React from 'react'

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}

const Footer = () => {

  return (
    <footer className="footer">
      <div className="actions">
        {/* <h5>Actions</h5>
        <button className="button" onClick={onMarkCompletedClicked}>
          Mark All Completed
        </button>
        <button className="button" onClick={onClearCompletedClicked}>
          Clear Completed
        </button> */}
      </div>

      <RemainingTodos count={1} />
    </footer>
  )
}

export default Footer
