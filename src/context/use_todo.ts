import { createContext, useContext } from 'react';
import type { TodoContextType } from './todo_context';

export const TodoContext = createContext<TodoContextType | null>(null);
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used inside TodoProvider');
  }
  return context;
};
