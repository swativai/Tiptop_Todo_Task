import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { TodoProvider } from './context/todo_context.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoProvider>
      <App />
      <Toaster position='top-right' richColors />
    </TodoProvider>
  </StrictMode>,
);
