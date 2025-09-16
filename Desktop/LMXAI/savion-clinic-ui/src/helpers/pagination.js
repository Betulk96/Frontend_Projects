import React from 'react';
import { Pagination } from 'react-bootstrap';

const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
    const paginationItems = [];

    
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
        paginationItems.push(
            <Pagination.Item key={1} onClick={() => onPageChange(1)}>
                1
            </Pagination.Item>
        );

        if (startPage > 2) {
            paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
        }
    }

    for (let page = startPage; page <= endPage; page++) {
        paginationItems.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => onPageChange(page)}
            >
                {page}
            </Pagination.Item>
        );
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
        }

        paginationItems.push(
            <Pagination.Item key={totalPages} onClick={() => onPageChange(totalPages)}>
                {totalPages}
            </Pagination.Item>
        );
    }

  return (
      
        <Pagination className="justify-content-center">
            <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
            {paginationItems}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
    );
};

export default CustomPagination;
