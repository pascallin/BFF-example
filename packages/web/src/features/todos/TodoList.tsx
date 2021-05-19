import React from 'react';
import { gql, useQuery } from '@apollo/client';

import TodoListItem from "./TodoListItem"

interface Todo {
  id: string,
  title: string
}

const GET_TODO_LIST = gql`
  query getTodoList {
    todolist(skip: 0, take: 50) {
      id
      title
    }
  }
`;

function TodoList(): JSX.Element {
    const { loading, error, data } = useQuery(GET_TODO_LIST);

  if (loading) return (<div>'Loading...'</div>);
  if (error) return (<div>{`Error! ${error.message}`}</div>);

  const renderedListItems = data.todolist.map((todoItem: Todo) => {
    return <TodoListItem key={todoItem.id} id={todoItem.id} title={todoItem.title}/>
  })

  return (
    <ul className="todo-list">
      {renderedListItems}
    </ul>
  );
}

export default TodoList;