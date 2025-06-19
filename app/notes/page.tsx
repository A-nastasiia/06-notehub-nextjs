"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "@/app/App.module.css"
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotesWithSearch } from "@/lib/api";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/NoteModal/NoteModal";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import { PropagateLoader } from "react-spinners";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedText] = useDebounce(searchQuery, 300);

  const { data, isSuccess, isPending, isError } = useQuery({
    queryKey: ["notes", debouncedText, currentPage],
    queryFn: () => fetchNotesWithSearch(debouncedText, currentPage),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedText]);

  function handleSearchChange(value: string) {
    setSearchQuery(value);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox inputValue={searchQuery} onChange={handleSearchChange} />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            setPage={handlePageChange}
            currentPage={currentPage}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
          />
        )}
        <button className={css.button} onClick={() => setIsOpenModal(true)}>
          Create note +
        </button>
      </header>
      {isError && <ErrorMessage />}
      
      {isPending && (
        <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",      
    }}
  >
    <PropagateLoader
  color="#0d6efd"
  size={11}
  speedMultiplier={2}
/>
  </div>
      )}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}

       {isSuccess && data.notes.length === 0 && (
      <p style={{
    textAlign: "center",
    fontSize: "1.2rem",
    marginTop: "40px",
    color: "#888",
  }}>No notes found for this search.</p>
    )}
      
      {isModalOpen && <NoteModal onClose={() => setIsOpenModal(false)} />}
    </div>
  );
}