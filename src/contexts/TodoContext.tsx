import {
  FunctionComponent,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from 'react';
import { TodoType } from '../models/common';
import { getLocalStorageValue } from '../utils/utils';

export interface TodoContextType {
  todos: TodoType[];
  addTodo: (todo: TodoType) => void;
  editTodo: (
    id: number,
    text: string,
    priority: string,
    completed: boolean
  ) => void;
  deleteTodo: (id: number) => void;
}

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider: FunctionComponent<TodoProviderProps> = ({
  children,
}) => {
  const [todos, setTodos] = useState<TodoType[]>(() =>
    // Initializes the todos state using localStorage value if available
    getLocalStorageValue<[]>('todos', [])
  );

  const addTodo = (todo: TodoType) => {
    setTodos((prevValue) => [todo, ...prevValue]);
  };

  const editTodo = (
    id: number,
    text: string,
    priority: string,
    completed: boolean
  ) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: text, priority, completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    // Persists the todos state in the localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
