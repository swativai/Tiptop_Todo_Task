import { type Todo, type FilterType } from '@/types/todo';
import { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoContext } from './use_todo';

export type TodoContextType = {
  todos: Todo[];
  filter: FilterType;

  addTodo: (title: string, description: string) => void;
  updateTodo: (id: string, title: string, description: string) => void;
  deleteTodo: (id: string) => void;
  toggleStatus: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  filteredTodos: Todo[];
};

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });
  const [filter, setFilter] = useState<FilterType>('ALL');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  const addTodo = (title: string, description: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      description,
      status: 'Pending',
      createdAt: new Date().toString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const updateTodo = (id: string, title: string, description: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo,
      ),
    );
  };
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleStatus = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === 'Pending' ? 'Done' : 'Pending' }
          : todo,
      ),
    );
  };

  const filteredTodos = useMemo(() => {
    const today = new Date().toDateString();
    return todos.filter((todo) => {
      if (filter === 'TODAY') {
        return new Date(todo.createdAt).toDateString() === today;
      }
      if (filter === 'PENDING') return todo.status === 'Pending';
      if (filter === 'DONE') return todo.status === 'Done';
      return true;
    });
  }, [todos, filter]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleStatus,
        filteredTodos,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
