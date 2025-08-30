import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    if (totalPages <= 1) {
        return null; 
    }

    return (
        <ul className="pagination center-align">
            <li className={currentPage === 1 ? 'disabled' : 'waves-effect'}>
                <a href="#!" onClick={() => onPageChange(currentPage - 1)}>
                    <i className="material-icons">chevron_left</i>
                </a>
            </li>
            {pageNumbers.map(number => (
                <li key={number} className={number === currentPage ? 'active' : 'waves-effect'}>
                    <a href="#!" onClick={() => onPageChange(number)}>
                        {number}
                    </a>
                </li>
            ))}
            <li className={currentPage === totalPages ? 'disabled' : 'waves-effect'}>
                <a href="#!" onClick={() => onPageChange(currentPage + 1)}>
                    <i className="material-icons">chevron_right</i>
                </a>
            </li>
        </ul>
    );
};

export default Pagination;