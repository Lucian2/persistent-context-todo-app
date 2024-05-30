import { FunctionComponent, useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Priority, TodoType } from '../../models/common';
import { getBadgeColor } from '../../utils/utils';
import { TodoContext, TodoContextType } from '../../contexts/TodoContext';

interface EditModalProps {
  show: boolean;
  handleClose: () => void;
  todo: TodoType;
}

export const EditModal: FunctionComponent<EditModalProps> = ({
  show,
  handleClose,
  todo,
}) => {
  const { editTodo } = useContext(TodoContext) as TodoContextType;
  const [todoInputValue, setTodoInputValue] = useState(todo.text);
  const [error, setError] = useState('');
  const [activePriorityOption, setActivePriorityOption] = useState(
    todo.priority
  );

  const handleEdit = () => {
    if (todoInputValue.trim().length > 4) {
      editTodo(todo.id, todoInputValue, activePriorityOption, todo.completed);
      handleClose();
      return;
    }
    setError('Add at least 5 characters.');
  };

  return (
    <Modal size='lg' centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type='text'
          className='form-control'
          value={todoInputValue}
          onChange={(e) => {
            if (error) setError('');
            setTodoInputValue(e.target.value);
          }}
        />
        {error && <p className='text-danger'>{error}</p>}
        <p className='mx-2 mt-3 text-dark'>Select a priority option:</p>
        <div className='priorityOptions d-flex gap-2'>
          {Object.values(Priority).map((priority) => (
            <button
              key={priority}
              onClick={() => setActivePriorityOption(priority)}
              className={`btn btn-${getBadgeColor(priority)}`}
            >
              {priority.replace('priority', '')}
            </button>
          ))}
        </div>
        <p className='mx-2 mt-4 text-dark'>
          Selected:
          <span className='ms-2 border border-success p-2'>
            {activePriorityOption}
          </span>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleEdit}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
