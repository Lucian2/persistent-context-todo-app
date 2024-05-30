import { FunctionComponent, useContext, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import { PriorityBadge } from '../common/PriorityBadge';
import { GrClose } from 'react-icons/gr';
import { DeleteBox } from '../common/DeleteBox';
import { TodoContext, TodoContextType } from '../../contexts/TodoContext';
import { EditModal } from '../common/EditModal';
import { TodoType } from '../../models/common';

interface TodoItemProps {
  todo: TodoType;
}

export const TodoItem: FunctionComponent<TodoItemProps> = ({ todo }) => {
  const { editTodo, deleteTodo } = useContext(TodoContext) as TodoContextType;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteBox, setShowDeleteBox] = useState(false);

  return (
    <tr id='todoItem'>
      <td
        className={`${
          todo.completed
            ? 'text-decoration-line-through'
            : 'text-decoration-none'
        }`}
      >
        {todo.text}
      </td>
      <td>
        <PriorityBadge label={todo.priority} />
      </td>
      <td className='position-relative'>
        <div className='actionsCtn w-100 d-flex justify-content-end aling-items-center'>
          <button
            onClick={() =>
              editTodo(todo.id, todo.text, todo.priority, !todo.completed)
            }
            className='btn bg-transparent border-0 p-0 me-1'
          >
            {!todo.completed ? (
              <FaCheck className='text-success' fontSize={'1.2rem'} />
            ) : (
              <GrClose className='text-danger' fontSize={'1.2rem'} />
            )}
          </button>
          <button
            onClick={() => setShowEditModal(true)}
            className='btn bg-transparent border-0 p-0 mx-2'
          >
            <FaEdit className='text-primary' fontSize={'1.2rem'} />
          </button>
          <button
            onClick={() => setShowDeleteBox(true)}
            className='btn bg-transparent border-0 p-0'
          >
            <RiDeleteBin6Fill className='text-danger' fontSize={'1.2rem'} />
          </button>

          {/* modals */}
          <EditModal
            todo={todo}
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
          />
          {showDeleteBox && (
            <DeleteBox
              handleClose={() => setShowDeleteBox(false)}
              handleDelete={() => deleteTodo(todo.id)}
            />
          )}
        </div>
      </td>
    </tr>
  );
};
