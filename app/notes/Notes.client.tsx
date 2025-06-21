// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useDebounce } from 'use-debounce';
// import { fetchNotes } from '@/lib/api';
// // import { Note } from '@/types/note';
// import SearchBox from '@/components/SearchBox/SearchBox';
// import Pagination from '@/components/Pagination/Pagination';
// import NoteList from '@/components/NoteList/NoteList';
// import NoteModal from '@/components/NoteModal/NoteModal';

// import css from './NotesPage.module.css';

// interface NotesProps {
//   // initialNotes: Note[];
//   // initialTotalPages: number;
//   initialPage: number;
//   // perPage: number;
// }

// const Notes: React.FC<NotesProps> = ({
//   // initialNotes,
//   // initialTotalPages,
//   initialPage,
//   // perPage,
// }) => {
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(initialPage);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isClient, setIsClient] = useState(false);

//   const [debouncedSearch] = useDebounce(search, 500);

//   //  const { data, isLoading, isFetching, error } = useQuery({
//   //   queryKey: ['notes', { page, perPage, search: debouncedSearch }],
//   //   queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch }),
//   //   initialData: {
//   //     notes: initialNotes,
//   //     totalPages: initialTotalPages,
//   //   },
//   //   keepPreviousData: true,
//   // });

// //   const { data, isLoading, isFetching, error } = useQuery({
// //   queryKey: ['notes', { page, perPage: 12, search }],
// //   queryFn: () => fetchNotes({ page, perPage: 12, search }),
// //   placeholderData: (prev) => prev,
// // });


// // const { data, isLoading, isFetching, error } = useQuery({
// //   queryKey: ['notes', { page, perPage: 12, search }],
// //   queryFn: () => fetchNotes({  page, perPage: 12, search  }),
// //   placeholderData: (prev) => prev,
// //   enabled: true,
// // });

// const { data, isLoading, isFetching, error } = useQuery({
//   queryKey: ['notes', { page, perPage: 12, search: debouncedSearch }],
//   queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
//   placeholderData: (prev) => prev,
//   enabled: true,
// });

//   const handleSearchChange = (value: string) => {
//     setSearch(value);
//     setPage(1); 
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//    useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (error) return <p>Помилка при завантаженні нотаток</p>;

//  const totalPages = data?.totalPages ?? 0;

//   return (
//     <div className={css.app}>
//       <div className={css.toolbar}>
//         <div className={css.left}>
//           <div className={css.titleRow}>
//             <h2 className={css.title}>NoteHub</h2>
//             <button onClick={handleOpenModal} className={css.createButton}>
//               Create note +
//             </button>
//           </div>

//           <SearchBox
//             value={search}
//             onChange={handleSearchChange}
//             onSearch={() => {}}
//             placeholder="Search notes..."
//           />
//         </div>
//       </div>

//       {(isLoading || isFetching) && <p>Завантаження...</p>}

//       <NoteList notes={data?.notes ?? []} isLoading={isLoading || isFetching} />

//       {/* {data && data.totalPages > 1 && (
//         <Pagination
//           currentPage={page}
//           totalPages={data.totalPages}
//           pageCount={data.totalPages}
//           onPageChange={handlePageChange}
//         />
//       )} */}

        

// {totalPages > 1 && (
//   <Pagination
//     currentPage={page}
//     totalPages={totalPages}
//     pageCount={totalPages}
//     onPageChange={handlePageChange}
//   />
// )}


//           {isClient && <NoteModal isOpen={isModalOpen} onClose={handleCloseModal} />}
//       {/* <NoteModal isOpen={isModalOpen} onClose={handleCloseModal} /> */}
//     </div>
//   );
// };

// export default Notes;

'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoteModal from '@/components/NoteModal/NoteModal';

import css from './NotesPage.module.css';

interface NotesProps {
  initialPage: number;
}

const Notes: React.FC<NotesProps> = ({ initialPage }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  // Використовуємо useQuery для отримання нотаток
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['notes', { page, perPage: 12, search: debouncedSearch }],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    placeholderData: (prev) => prev, // Підвантажуємо попередні дані, якщо вони є
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // Скидаємо сторінку на першу при зміні пошукового запиту
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (error) return <p>Помилка при завантаженні нотаток: {error.message}</p>;

  const totalPages = data?.totalPages ?? 0;

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
            onSearch={() => {}}
            placeholder="Search notes..."
          />
        </div>
      </div>

      {(isLoading || isFetching) && <p>Завантаження...</p>}

      <NoteList notes={data?.notes ?? []} isLoading={isLoading || isFetching} />

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          pageCount={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {isClient && <NoteModal isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
};

export default Notes;