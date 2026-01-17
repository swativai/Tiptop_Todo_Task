import { type Todo } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTodo } from '@/context/use_todo';
import { useState } from 'react';
import { toast } from 'sonner';

interface TodoCardProps {
  todo: Todo;
  toggleStatus: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const TodoCard = ({ todo, toggleStatus, deleteTodo }: TodoCardProps) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const { updateTodo } = useTodo();
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();

    try {
      updateTodo(id, title, description);
      toast.success('Todo Edit successfully!');
      setTitle('');
      setDescription('');
      setIsOpen(false);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.log(error);
    }
  }
  return (
    <div className='border p-4 rounded-lg shadow-sm bg-white flex flex-col gap-2'>
      <div className='flex justify-between items-start'>
        <Checkbox
          className='border-gray-900 border-2'
          onClick={() => toggleStatus(todo.id)}
        />
        <h2 className='text-lg font-semibold'>{todo.title}</h2>
        <span
          className={`px-2 py-1 rounded text-sm font-medium ${
            todo.status === 'Pending'
              ? 'bg-yellow-200 text-yellow-800'
              : 'bg-green-200 text-green-800'
          }`}
        >
          {todo.status}
        </span>
      </div>
      <p className='text-gray-700'>{todo.description}</p>
      <p className='text-xs text-gray-400'>
        Created: {new Date(todo.createdAt).toLocaleString()}
      </p>

      <div className='flex gap-2 mt-2'>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className='bg-blue-600 text-white hover:bg-blue-700 flex gap-2'>
              Edit
            </Button>
          </DialogTrigger>

          <DialogContent className='sm:max-w-lg'>
            <form onSubmit={(e) => handleSubmit(e, todo.id)}>
              <DialogHeader>
                <DialogTitle>Add New Todo</DialogTitle>
                <DialogDescription>
                  Create a new task and manage your daily work.
                </DialogDescription>
              </DialogHeader>

              <div className='grid gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='title'>Title</Label>
                  <Input
                    name='title'
                    placeholder='Enter todo title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    name='description'
                    placeholder='Write details here...'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter className='mt-4'>
                <DialogClose asChild>
                  <Button variant='outline'>Cancel</Button>
                </DialogClose>
                <Button type='submit' className='bg-blue-600 hover:bg-blue-700'>
                  Update
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Button
          size='sm'
          variant='destructive'
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
