import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store.ts";
import AddTodo from "./components/AddTodo/AddTodo.tsx";
import EditTodo from "./components/EditTodo/EditTodo.tsx";
import FilterTodo from "./components/FilterTodo/FilterTodo.tsx";
import TodoList from "./components/TodoList/TodoList.tsx";
import styled from 'styled-components';

export interface TodoInterface {
  id: string;
  task: string;
  completed: boolean;
}

const App = () => {
// здесь мы переходим к состоянию todos и читаем его при каждом изменении
  const todos = useSelector((state: RootState) => state.todos.todos);

// editTodo используется для получения todo, который нужно отредактировать
  const [editTodo, setEditTodo] = useState<TodoInterface | null>(null);

// todoFilterValue используется для фильтрации задач по выбору
  const [todoFilterValue, setTodoFilterValue] = useState("all");

// получает значение фильтра из select и устанавливает его в состояние
  const getTodoFilterValue = (filterValue: string) =>
    setTodoFilterValue(filterValue);

// получает todo, который нужно отредактировать, и устанавливает его в состояние
  const getEditTodo = (editTodo: TodoInterface) => setEditTodo(editTodo);

const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%
`;

const AppInputsBox = styled.div`
    display: flex;
    // flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`

return (
    <main className="app" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <AppWrapper>
        <div className="appheader">
          <h1 className="apptitle" style={{fontSize: '3rem'}}>Todo App</h1>
        </div>
        <AppInputsBox className="app_inputs-box">
          {editTodo?.id ? (
            <EditTodo editTodo={editTodo} setEditTodo={setEditTodo} />
          ) : (
            <AddTodo />
          )}
          <FilterTodo getTodoFilterValue={getTodoFilterValue} />
        </AppInputsBox>
        <TodoList
          todos={todos}
          todoFilterValue={todoFilterValue}
          getEditTodo={getEditTodo}
          setEditTodo={setEditTodo}
          editTodo={editTodo}
        />
      </AppWrapper>
    </main>
  );
};

export default App;