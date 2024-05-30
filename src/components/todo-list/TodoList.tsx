import { FunctionComponent, useContext, useState } from 'react';
import { TodoFilter } from '../../models/common';
import './TodoList.scss';
import { TodoContext, TodoContextType } from '../../contexts/TodoContext';
import { TodoItem } from '../todo-item/TodoItem';

export const TodoList: FunctionComponent = () => {
  const { todos } = useContext(TodoContext) as TodoContextType;
  const [activeFilter, setActiveFilter] = useState(TodoFilter.All);

  const getFilteredTodos = () => {
    switch (activeFilter) {
      case TodoFilter.Completed:
        return todos.filter((todo) => todo.completed);
      case TodoFilter.Pending:
        return todos.filter((todo) => !todo.completed);
      default:
        return [
          ...todos.filter((todo) => !todo.completed),
          ...todos.filter((todo) => todo.completed),
        ];
    }
  };

  return (
    <section id='todoList' className='py-4 px-4 rounded-bottom'>
      <ul className='filterMenuList d-flex gap-2 m-0 ps-2'>
        {Object.values(TodoFilter).map((el) => (
          <li
            key={el}
            role='button'
            className={`listEl ${
              activeFilter === el ? 'active ' : ''
            }text-center me-3`}
            onClick={() => setActiveFilter(el)}
          >
            {el}
          </li>
        ))}
      </ul>
      <div className='table-responsive mt-4'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Task</th>
              <th scope='col'>Priority</th>
              <th className='text-end' scope='col'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {getFilteredTodos().length > 0 ? (
              getFilteredTodos().map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            ) : (
              <tr>
                <td colSpan={3}>No tasks...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
