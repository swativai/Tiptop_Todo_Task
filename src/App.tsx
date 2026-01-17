import { Navbar } from './components/common/navbar';
import { TodoFilter } from './components/common/todo_filter';
import { TodoList } from './components/common/todo_list';

function App() {
  return (
    <>
      <div className='pt-32 max-w-5xl mx-auto px-4'>
        <Navbar />

        <div className='mt-6'>
          <TodoFilter />
        </div>

        <div className='mt-6'>
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
