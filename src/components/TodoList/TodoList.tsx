import React from "react";
import TodoItem from "./TodoItem/TodoItem.tsx";
import { TodoInterface } from "../../App.tsx";
import styled from "styled-components";

// задали типы для каждого передаваемого свойства
type TodoListProps = {
  todos: TodoInterface[];
  todoFilterValue: string;
  getEditTodo: (editTodo: TodoInterface) => void;
  setEditTodo: (editTodo: TodoInterface) => void;
  editTodo: TodoInterface | null;
};

const List = styled.div`
    padding-left: 0;
    width: 10rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TodoList = ({
  todos,
  todoFilterValue,
  editTodo,
  getEditTodo,
  setEditTodo,
}: TodoListProps) => {
  return (
    <List>
      {todos
        // .filter((todo) => (todoFilterValue === "all" ? true : todo.completed))

        .filter((todo) => {
          if (todoFilterValue === "completed") {
            return todo.completed;
          } else if (todoFilterValue === "incomplete") {
            return !todo.completed;
          }
          return true;
        })

        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editTodo={editTodo}
            getEditTodo={getEditTodo}
            setEditTodo={setEditTodo}
          />
        ))}
    </List>
  );
};

export default TodoList;
