import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { editTodo as updateTodo } from "../../redux/todo.ts";
import { TodoInterface } from "../../App.tsx";

type EditTodoProps = {
  editTodo: TodoInterface;
  setEditTodo: (editTodo: TodoInterface) => void;
};

const EditTodo = ({ editTodo, setEditTodo}: EditTodoProps) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

// effect hook будет устанавливать новую задачу при каждом нажатии пользователем кнопки редактирования todo
  useEffect(() => {
    setTask(editTodo.task);
  }, [editTodo]);

// Этот обработчик событий отправляет действие для обновления отредактированной задачи и сбрасывает состояние editTodo, так что форма переключается с edit todo на add todo 
  const handleEditTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim().length < 5) {
      setError("Minimum allowed task length is 5");
    } else if (task.trim().length > 50) {
      setError("Maximum allowed task length is 50");
    } else {
      dispatch(updateTodo({ editedTodo: { ...editTodo, task } }));
      setEditTodo({ id: "", task: "", completed: false });
      setTask("");
    }
  };

// этот обработчик событий удаляет ошибку, если длина символа больше 5 и меньше 50
  const handleUpdateTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
    if (task.trim().length > 5 && task.trim().length < 50) {
      setError("");
    }
  };

console.log(editTodo);
  return (
    <form onSubmit={handleEditTaskSubmit} className="form" style={{display: 'flex', alignItems: 'center'}}>
      <div className="form_control">
        <input
          onChange={handleUpdateTodoChange}
          value={task}
          type="text"
          className="forminput"
          placeholder="Edit todo..."
          style={{height: '3rem', fontSize: '1.5rem', borderRadius: '0.5rem', paddingLeft: '1rem'}}
        />
        {error && <p className="formerror-text">{error}</p>}
      </div>
      <button className="btn form_btn" style={{height: '3.3rem', fontSize: '1.4rem', background: 'yellow', borderRadius: '0.5rem'}}>Edit Todo</button>
    </form>
  );
};

export default EditTodo;