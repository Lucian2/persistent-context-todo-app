import { FunctionComponent, useEffect, useRef } from 'react';
import './Common.scss';

interface DeleteBoxProps {
  handleClose: () => void;
  handleDelete: () => void;
}

export const DeleteBox: FunctionComponent<DeleteBoxProps> = ({
  handleClose,
  handleDelete,
}) => {
  const deleteBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        deleteBoxRef.current &&
        !deleteBoxRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  return (
    <div
      ref={deleteBoxRef}
      className='deleteBox position-absolute border border-dark text-end'
    >
      <small>Are you sure you want to delete ?</small>
      <button
        onClick={handleDelete}
        className='btn mx-1 btn-primary btn-sm p-1'
      >
        Yes
      </button>
      <button onClick={handleClose} className='btn btn-secondary btn-sm p-1'>
        No
      </button>
    </div>
  );
};
