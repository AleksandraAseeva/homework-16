import React, { useState } from "react";

type FilterTodoProps = {
  getTodoFilterValue: (filterValue: string) => void;
};

const FilterTodo = ({ getTodoFilterValue }: FilterTodoProps) => {
  const [filterTodoVal, setFilterTodoVal] = useState("all");

// Этот обработчик событий обновляет текущую опцию выбора и передает текущее значение выбранной опции компоненту приложения  
const handleFilterTodoChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterTodoVal(e.target.value);
    getTodoFilterValue(e.target.value);
  };

  return (
    <select
      onChange={handleFilterTodoChanges}
      value={filterTodoVal}
      className="filter-todo"
      style={{position: 'absolute', right: '-14rem', fontSize: '1.5rem', padding: '0 1rem', borderRadius: '0.5rem', height: '3rem', marginLeft: '1rem'}}
    >
      <option value="all" style={{fontSize: '1rem'}}>All</option>
      <option value="completed" style={{fontSize: '1rem'}}>Completed</option>
      <option value="incomplete" style={{ fontSize: '1rem' }}>Incomplete</option>
    </select>
  );
};

export default FilterTodo;