import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client';


const ADD_TODO_ITEM = gql`
  mutation addTodoItem($title: String!) {
    addTodoItem(newTodoData: { title: $title }) {
      id
      title
    }
  }
`;

const Header = () => {
  const [text, setText] = useState('')
  const handleChange = (e) => setText(e.target.value)

  const [addItem, { data }] = useMutation(ADD_TODO_ITEM);

  const handleKeyDown = (e) => {
    // If the user pressed the Enter key:
    const trimmedText = text.trim()
    if (e.which === 13 && trimmedText) {
      addItem({ variables: { title: trimmedText } })
      // And clear out the text input
      setText('')
    }
  }

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </header>
  )
}

export default Header
