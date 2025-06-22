'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import { Note } from '@/types/note';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoteModal from '@/components/NoteModal/NoteModal';

import css from './NotesPage.module.css';

interface NotesProps {
  initialNotes: Note[];
  initialTotalPages: number;
  initialPage: number;
  perPage: number;
}

const Notes: React.FC<NotesProps> = ({
  initialNotes,
  initialTotalPages,
  initialPage,
  perPage,
}) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isClient, setIsClient] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);


const { data, isLoading, isFetching, error } = useQuery({
  queryKey: ['notes', { page, perPage, search: debouncedSearch }],
  queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch }),
  initialData: {
    notes: initialNotes,
    totalPages: initialTotalPages,
  },
  placeholderData: (prev) => prev,
  enabled: true,
});

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); 
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const totalPages = data?.totalPages ?? 0;

  if (error) return <p>Помилка при завантаженні нотаток</p>;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <div className={css.left}>
          <div className={css.titleRow}>
            <h2 className={css.title}>NoteHub</h2>
            <button onClick={handleOpenModal} className={css.createButton}>
              Create note +
            </button>
          </div>

          <SearchBox
            value={search}
            onChange={handleSearchChange}
            // onSearch={() => {}}
            placeholder="Search notes..."
          />
        </div>
      </div>

      {(isLoading || isFetching) && <p>Завантаження...</p>}

       {data?.notes?.length > 0 && (
        <NoteList notes={data.notes} isLoading={isLoading || isFetching} />
      )}

      {/* <NoteList notes={data?.notes ?? []} isLoading={isLoading || isFetching} /> */}

      {/* {data && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          pageCount={data.totalPages}
          onPageChange={handlePageChange}
        />
      )} */}

        

{totalPages > 1 && (
  <Pagination
    currentPage={page}
    totalPages={totalPages}
    pageCount={totalPages}
    onPageChange={handlePageChange}
  />
)}

           <NoteModal isOpen={isModalOpen}  onClose={handleCloseModal} />
          {/* {isClient && <NoteModal isOpen={isModalOpen} onClose={handleCloseModal} />} */}
      {/* <NoteModal isOpen={isModalOpen} onClose={handleCloseModal} /> */}
    </div>
  );
};

export default Notes;