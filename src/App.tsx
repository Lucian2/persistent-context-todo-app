import './App.scss';
import { HeaderComponent } from './components/header/HeaderComponent';
import { TodoList } from './components/todo-list/TodoList';
import { TodoProvider } from './contexts/TodoContext';

function App() {
  return (
    <div className='App my-5 p-5 container-md'>
      <TodoProvider>
        <HeaderComponent />
        <TodoList />
      </TodoProvider>
    </div>
  );
}

export default App;
