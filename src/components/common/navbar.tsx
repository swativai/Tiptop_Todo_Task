import { Button } from '@/components/ui/button';
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
import { List, Plus } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { useTodo } from '@/context/use_todo';
import { toast } from 'sonner';

export const Navbar = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTodo } = useTodo();
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title || !description) {
      toast('Title and Description required');
      return;
    }
    try {
      addTodo(title, description);
      toast.success('Todo added successfully!');
      setTitle('');
      setDescription('');
      setIsOpen(false);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.log(error);
    }
  }
  return (
    <div className='fixed top-0 left-0 w-full bg-white shadow-md border-b'>
      <div className='flex items-center justify-between p-4 max-w-7xl mx-auto'>
        <div className='flex gap-3 items-center'>
          <List color='#155dfc' size={'40px'} />
          <div>
            <h1 className='text-2xl font-semibold text-gray-900'>
              {' '}
              Todo Manager
            </h1>
            <p className='text-sm text-gray-500'>
              Manage your daily task with todo Manager
            </p>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className='bg-blue-600 text-white hover:bg-blue-700 flex gap-2'>
              <Plus size={18} /> Add New Todo
            </Button>
          </DialogTrigger>

          <DialogContent className='sm:max-w-lg'>
            <form onSubmit={handleSubmit}>
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
                  Add
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
