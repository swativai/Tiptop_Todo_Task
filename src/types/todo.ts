export type TodoStatus = 'Pending' | 'Done';

export type FilterType = 'ALL' | 'TODAY' | 'PENDING' | 'DONE';

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: string;
}
