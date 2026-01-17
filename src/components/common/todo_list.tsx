import { useTodo } from '@/context/use_todo';
import { TodoCard } from './todo_card';

export const TodoList = () => {
  const { filteredTodos, toggleStatus, deleteTodo } = useTodo();

  if (filteredTodos.length === 0) {
    return <p className='text-center text-gray-500 mt-8'>No todos found!</p>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 mt-24'>
      {filteredTodos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          toggleStatus={toggleStatus}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};
