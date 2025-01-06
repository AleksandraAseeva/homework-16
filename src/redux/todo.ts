// создаем редюсер для обработки состояния нашего приложения
import { createSlice } from "@reduxjs/toolkit";
import { TodoInterface } from "../App";

// форма массива задач
interface TodosListInterface {
    todos: TodoInterface[];
}

// начальное состояние задач
const initialState: TodosListInterface = {
    todos: [],
};

// срез задач с начальным состоянием и редукторами для изменения состояния.
// Они выполняют CRUD, а также переключают todo.
// Redux-инструментарий использует Immutable.js, который позволяет нам изменять состояние
// но в фоновом режиме все работает как неизмененное состояние.
export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, { payload: { task, id, completed } }) => {
            state.todos.push({ id, task, completed });
        },

        deleteTodo: (state, { payload: { todoId } }) => {
            state.todos = state.todos.filter((todo) => todo.id !== todoId);
        },

        editTodo: (state, { payload: { editedTodo } }) => {
            console.log(editedTodo);
            state.todos = state.todos.map((todo) =>
                todo.id === editedTodo.id ? editedTodo : todo
            );
        },

        toggleTodo: (state, { payload: { todoId } }) => {
            state.todos = state.todos.map((todo) =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            );
        },
    },
});

// действия для указания редуктору, что делать с состоянием,
// они также могут включать полезную нагрузку для изменения состояния
export const { addTodo, deleteTodo, editTodo, toggleTodo } = todoSlice.actions;

// редуктор для изменения состояния
export default todoSlice.reducer;
