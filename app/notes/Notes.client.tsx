
'use client';

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import { Note } from "../../types/note";
import { useDebounce } from 'use-debounce';

import css from "./NotesPage.module.css";

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

  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['notes', { page, perPage, search: debouncedSearch }],
    queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch }),
     initialData: {
    notes: initialNotes,
    totalPages: initialTotalPages,
  },
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); 
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (error) return <p>Error loading notes</p>;

  return (
    <div className={css.app}>

        {data && data.totalPages > 1 && (
          <div className={css.pagination}>
           <button
               onClick={() => handlePageChange(page - 1)}
                 disabled={page === 1}
              className={css.pageButton}
              >
              &lt;
            </button>

             {Array.from({ length: data.totalPages }, (_, i) => (
            <button
               key={i + 1}
              onClick={() => handlePageChange(i + 1)}
             className={`${css.pageButton} ${page === i + 1 ? css.activePage : ''}`}
              >
             {i + 1}
            </button>
         ))}

    <button
      onClick={() => handlePageChange(page + 1)}
      disabled={page === data.totalPages}
      className={css.pageButton}
    >
      &gt;
    </button>
  </div>
)}
      <div className={css.toolbar}>
  <div className={css.left}>
    <div className={css.titleRow}>
      <h2 className={css.title}>NoteHub</h2>
      <button className={css.createButton}>Create note +</button>
    </div>
    <input
      type="text"
      value={search}
      onChange={handleSearchChange}
      placeholder="Search notes"
      className={css.searchInput}
    />
  </div>
</div>

      {(isLoading || isFetching) && <p>Loading...</p>}

      <div className={css.noteGrid}>
        {data?.notes.map((note) => (
          <div key={note.id} className={css.noteCard}>
            <h3 className={css.noteTitle}>{note.title}</h3>
            <p className={css.noteContent}>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;


// 'use client';

// import { useQuery } from '@tanstack/react-query';
// import { fetchNotes } from '@/lib/api';
// import { useState } from 'react';
// import type { Note } from '@/types/note';

// interface NotesProps {
//   initialNotes: Note[];
//   initialTotalPages: number;
//   initialPage: number;
//   perPage: number;
// }

// export default function Notes({
//   initialNotes,
//   initialTotalPages,
//   initialPage,
//   perPage,
// }: NotesProps) {
//   const [search] = useState('');
//   const [page] = useState(initialPage);

// const { data, isLoading, error } = useQuery({
//   queryKey: ['notes', { page, perPage, search }],
//   queryFn: () => fetchNotes({ page, perPage, search }),
//   placeholderData: {
//     notes: initialNotes,
//     totalPages: initialTotalPages,
//   },
// });

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading notes</p>;
//   if (!data) return <p>No data loaded</p>;

//   return (
//     <div>
//       {data.notes.map((note) => (
//         <div key={note.id}>
//           <h3>{note.title}</h3>
//           <p>{note.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { fetchNotes } from "@/lib/api";
// import { useState } from "react";
// import type { Note } from "@/types/note";

// interface NotesProps {
//   initialNotes: Note[];
//   initialTotalPages: number;
//   initialPage: number;
//   perPage: number;
// }

// interface FetchNotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// export default function Notes({
//   initialNotes,
//   initialTotalPages,
//   initialPage,
//   perPage,
// }: NotesProps) {
//   const [search] = useState('');
//   const [page] = useState(initialPage);

//   const { data, isLoading, error } = useQuery<FetchNotesResponse>({
//     queryKey: ["notes", { page, perPage, search }],
//     queryFn: () => fetchNotes({ page, perPage, search }),
//     placeholderData: {
//       notes: initialNotes,
//       totalPages: initialTotalPages,
//     },
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading notes</p>;
//   if (!data) return <p>No data loaded</p>;

//   return (
//     <div>
//       {data.notes.map((note) => (
//         <div key={note.id}>
//           <h3>{note.title}</h3>
//           <p>{note.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// 'use client';
// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchNotes } from "../../lib/api";
// import { Note } from "../../types/note";

// interface NotesProps {
//   initialNotes: Note[];
//   initialTotalPages: number;
//   initialPage: number;
//   perPage: number;
// }

// const Notes: React.FC<NotesProps> = ({
//   initialNotes,
//   initialTotalPages,
//   initialPage,
//   perPage,
// }) => {
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(initialPage);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ['notes', { page, perPage, search }],
//     queryFn: () => fetchNotes({ page, perPage, search }),
//     initialData: { notes: initialNotes, totalPages: initialTotalPages }
//   });

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value); 
//   };

//     const handlePageChange = (newPage: number) => {
//     setPage(newPage);};

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading notes</p>;

//   return (
//     <div>
//       <input
//         type="text"
//         value={search}
//         onChange={handleSearchChange} 
//         placeholder="Search notes..."
//       />
//        {data && data.totalPages > 1 && (
//         <div>
//           <button 
//             onClick={() => handlePageChange(page - 1)} 
//             disabled={page <= 1}
//           >
//             Prev
//           </button>
//           <span>Page {page} of {data.totalPages}</span>
//           <button 
//             onClick={() => handlePageChange(page + 1)} 
//             disabled={page >= data.totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {data?.notes.map((note) => (
//         <div key={note.id}>
//           <h3>{note.title}</h3>
//           <p>{note.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Notes;




// "use client";

// import React, { useState, useCallback } from "react";
// import { useQuery, keepPreviousData } from "@tanstack/react-query";
// import { useDebounce } from "use-debounce";

// import css from "./NotesPage.module.css";
// import SearchBox from "../../components/SearchBox/SearchBox";
// import NoteList from "../../components/NoteList/NoteList";
// import NoteModal from "../../components/NoteModal/NoteModal";
// import Pagination from "../../components/Pagination/Pagination";

// import { fetchNotes } from "../../lib/api";
// import type { Note } from "../../types/note";
// import ErrorMessage from "./error";

// const PER_PAGE = 12;

// interface NotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// const Notes: React.FC = () => {
//   const [search, setSearch] = useState<string>("");
//   const [page, setPage] = useState<number>(1);
//   const [isModalOpen, setModalOpen] = useState<boolean>(false);

//   const [debouncedSearch] = useDebounce(search, 500);

//   const { data, isLoading, isError, error } = useQuery<NotesResponse, Error>({
//     queryKey: ["notes", { page, search: debouncedSearch }],
//     queryFn: () =>
//       fetchNotes({ page, perPage: PER_PAGE, search: debouncedSearch }),
//     placeholderData: keepPreviousData,
//   });

//   const handleSearch = useCallback((searchText: string) => {
//     setPage(1);
//     setSearch(searchText);
//   }, []);

//   const handlePageChange = useCallback((newPage: number) => {
//     setPage(newPage);
//   }, []);

//   const openModal = useCallback(() => setModalOpen(true), []);
//   const closeModal = useCallback(() => setModalOpen(false), []);

//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <SearchBox
//           value={search}
//           onChange={setSearch}
//           onSearch={handleSearch}
//         />

//         {data?.totalPages && data.totalPages > 1 && (
//           <Pagination
//             pageCount={data.totalPages}
//             currentPage={page}
//             onPageChange={handlePageChange}
//           />
//         )}

//         <button className={css.button} onClick={openModal}>
//           Create Note +
//         </button>
//       </header>

//       {isLoading && <p className={css.status}>Loading...</p>}
//       {isError && error && <ErrorMessage error={error} />}

//       {data && <NoteList notes={data.notes} />}

//       {isModalOpen && <NoteModal onClose={closeModal} />}
//     </div>
//   );
// };

// export default Notes;