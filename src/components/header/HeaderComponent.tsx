import { FunctionComponent, useContext, useState } from 'react';
import './HeaderComponent.scss';
import { Priority } from '../../models/common';
import { TodoContext, TodoContextType } from '../../contexts/TodoContext';

export const HeaderComponent: FunctionComponent = () => {
  const { addTodo } = useContext(TodoContext) as TodoContextType;
  const [todoInputValue, setTodoInputValue] = useState('');
  const [error, setError] = useState('');
  const [selectedPriorityOption, setSelectedPriorityOption] = useState(
    Priority.Low
  );

  const handleTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError('');
    setTodoInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (todoInputValue.trim().length > 4) {
      addTodo({
        id: Date.now(),
        text: todoInputValue,
        completed: false,
        priority: selectedPriorityOption,
      });
      setTodoInputValue('');
      setSelectedPriorityOption(Priority.Low);
      return;
    }
    setError('Add at least 5 characters.');
  };

  return (
    <section
      id='headerComponent'
      className='d-flex p-4 gap-4 justify-content-between flex-column flex-md-row align-items-center rounded-top'
    >
      <div className='form-group position-relative w-100'>
        <input
          type='text'
          className='form-control border-0 rounded-0 bg-light py-2'
          id='new-task-input'
          placeholder='New task...'
          value={todoInputValue}
          onChange={(e) => handleTodoInputChange(e)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
        />
        {error && <p className='text-danger m-2 position-absolute'>{error}</p>}
      </div>
      <select
        className='form-select py-2 mt-3 mt-md-0'
        value={selectedPriorityOption}
        onChange={(e) => setSelectedPriorityOption(e.target.value as Priority)}
      >
        <option value={Priority.Low}>{Priority.Low}</option>
        <option value={Priority.Middle}>{Priority.Middle}</option>
        <option value={Priority.High}>{Priority.High}</option>
      </select>
      <button onClick={handleAddTodo} className='btn btn-primary'>
        Add
      </button>
    </section>
  );
};
