import { useTodo } from '@/context/use_todo';
import { Button } from '../ui/button';
import { useState } from 'react';

export const TodoFilter = () => {
  const { setFilter } = useTodo();
  const [activeFilter, setActiveFilter] = useState<
    'ALL' | 'TODAY' | 'PENDING' | 'DONE'
  >('ALL');

  const handleClick = (filter: 'ALL' | 'TODAY' | 'PENDING' | 'DONE') => {
    setFilter(filter);
    setActiveFilter(filter);
  };

  return (
    <div className='flex flex-wrap gap-3 justify-center my-4'>
      {['ALL', 'TODAY', 'PENDING', 'DONE'].map((filter) => (
        <Button
          key={filter}
          onClick={() =>
            handleClick(filter as 'ALL' | 'TODAY' | 'PENDING' | 'DONE')
          }
          className={`
            px-4 py-2 rounded-lg font-semibold transition
            ${
              activeFilter === filter
                ? 'bg-blue-600 text-white shadow-lg hover:bg-bg-blue-600'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
            }
          `}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};
