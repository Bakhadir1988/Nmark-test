'use client';

import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './pagination-widget.module.css';

interface PaginationWidgetProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

export const PaginationWidget: React.FC<PaginationWidgetProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1); // react-paginate использует 0-based индексы
  };

  if (totalPages <= 1) {
    return null; // Не показываем пагинацию если страница одна
  }

  return (
    <section className={styles.root}>
      {/* Информация о количестве элементов */}
      {totalItems && itemsPerPage && (
        <div className={styles.info}>
          Показано {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}{' '}
          - {Math.min(currentPage * itemsPerPage, totalItems)} из {totalItems}{' '}
          товаров
        </div>
      )}

      {/* Пагинация */}
      <ReactPaginate
        previousLabel="←"
        nextLabel="→"
        pageCount={totalPages}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1} // react-paginate использует 0-based индексы
        containerClassName={styles.pagination}
        pageClassName={styles.page}
        pageLinkClassName={styles.pageLink}
        previousClassName={styles.previous}
        nextClassName={styles.next}
        previousLinkClassName={styles.previousLink}
        nextLinkClassName={styles.nextLink}
        activeClassName={styles.active}
        disabledClassName={styles.disabled}
        breakClassName={styles.break}
        breakLinkClassName={styles.breakLink}
      />
    </section>
  );
};
