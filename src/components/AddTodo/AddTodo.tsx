import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "../../redux/todo.ts";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

/** эта функция предотвращает обновление страницы по умолчанию при отправке формы и устанавливает значение ошибки, если длина символов меньше 5 или больше 50. 
В противном случае, если ошибок нет, она отправляет действие в редуктор для добавления новой задачи с уникальным идентификатором. И устанавливает значение ввода пустым */
  const handleAddTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim().length < 5) {
      setError("Minimum allowed task length is 5");
    } else if (task.trim().length > 50) {
      setError("Maximum allowed task length is 50");
    } else {
      dispatch(addTodo({ task, id: uuidv4(), completed: false }));
      setTask("");
    }
  };

/** эта функция удаляет ошибку из состояния, если длина символа больше 5 и меньше 50 */
  const handleUpdateTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
    if (task.trim().length > 5 && task.trim().length < 50) {
      setError("");
    }
  };

return (
    <form onSubmit={handleAddTaskSubmit} className="form" style={{display: 'flex', flexDirection: "column", fontSize: '2rem'}}>
      <div style={{display: "flex", gap: '1rem'}}>
      <div className="form_control" style={{display: "flex", height: '3rem'}}>
        <input
          onChange={handleUpdateTodoChange}
          value={task}
          type="text"
          className="forminput"
          placeholder="Add todo..."
          style={{width: '15rem', fontSize: '1.5rem', borderRadius: '0.5rem', paddingLeft: '1rem'}}
        />
        
      </div>
      <button className="btn form_btn" style={{fontSize: '1.4rem', padding: '0 1rem', borderRadius: '0.5rem', background: 'yellow'}}>Add Todo</button>
      </div>
      {error && <p className="formerror-text" style={{color: 'red', position: 'absolute', fontSize: '1.5rem', top: '2rem'}}>{error}</p>}
    </form>
  );
};

export default AddTodo;