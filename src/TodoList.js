import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onUpdate, onDelete, onComplete }) {
  return (<>
    {todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} onComplete={onComplete} />
    ))}
  </>
  );
}

export default TodoList;
