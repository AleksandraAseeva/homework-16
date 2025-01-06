import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../../../redux/todo.ts";
import { TodoInterface } from "../../../App.tsx";
import styled from "styled-components";

type TodoItemProps = {
  todo: TodoInterface;
  editTodo: TodoInterface | null;
  getEditTodo: (editTodo: TodoInterface) => void;
  setEditTodo: (editTodo: TodoInterface) => void;
};

const TodoItem = ({
  todo,
  editTodo,
  getEditTodo,
  setEditTodo,

}: TodoItemProps) => {
  const dispatch = useDispatch();

  // Этот обработчик событий включает и выключает флажок
  const handleToggleTodoChange = () =>
    dispatch(toggleTodo({ todoId: todo.id }));

  /** Этот обработчик событий удаляет текущее задание при нажатии кнопки "удалить"
 Он также сбрасывает состояние editTodo, если оно удалено*/
  const handleDeleteTodoClick = () => {
    dispatch(deleteTodo({ todoId: todo.id }));
    if (todo.id === editTodo?.id) {
      setEditTodo({ id: "", task: "", completed: false });
    }
  };

  // Этот обработчик событий получает текущее задание, которое необходимо отредактировать
  const handleGetEditTodoClick = () => getEditTodo(todo);

  const TodoListItem = styled.div`
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    height: 3rem;
    font-size: 1.3rem;
    width: 25rem;
    align-items: center;
    margin: 1rem;
    background-color:rgb(193, 190, 211);
    padding: 1rem;
    border-radius: 1rem;
`

  return (
    <TodoListItem>
      <label
        htmlFor={todo.id}
        style={
          todo.completed
            ? { textDecoration: "line-through", color: 'green' }
            : { textDecoration: "none" }
        }
        className="todo-listlabel"
      >
        <input
          onChange={handleToggleTodoChange}
          checked={todo.completed ? true : false}
          type="checkbox"
          id={todo.id}
          className="todo-listcheckbox"
          style={{width: '1.5rem', height: '1.2rem'}}
        />
        {todo.task}
      </label>
      <div className="todo-listbtns-box" style={{ display: 'flex', gap: '1rem' }}>
        <button
          style={{ border: 'none', background: 'none' }}
          onClick={handleGetEditTodoClick}
          className="todo-listbtn todo-listedit-btn">
          <MdModeEditOutline style={{ width: '1.5rem', height: '2rem'}}/>
        </button>
        <button
          style={{ border: 'none', marginRight: '1rem', background: 'none'}}
          onClick={handleDeleteTodoClick}
          className="todo-listbtn todo-list_delete-btn"
        >
          <FaTrashAlt style={{ width: '1.5rem', height: '1.3rem'}}/>
        </button>
      </div>
    </TodoListItem>
  );
};

export default TodoItem;