
import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;

  nextLabel?: React.ReactNode;
  previousLabel?: React.ReactNode;
  breakLabel?: React.ReactNode;
  pageRangeDisplayed?: number;
  [key: string]: unknown;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  nextLabel = "→",
  previousLabel = "←",
  breakLabel = "...",
  pageRangeDisplayed = 3,
  ...restProps
}) => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      breakLabel={breakLabel}
      nextLabel={nextLabel}
      onPageChange={handlePageChange}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={totalPages}
      previousLabel={previousLabel}
      forcePage={currentPage - 1} 
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      {...restProps}
    />
  );
};

export default Pagination;