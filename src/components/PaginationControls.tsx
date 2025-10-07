import React from 'react';

interface PaginationControlsProps {
    currentPage: number;
    totalTodos: number;
    limitPerPage: number;
    onNextPage: () => void;
    onPrevPage: () => void;
    onChangeLimit: (limit: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({currentPage, totalTodos, limitPerPage, onNextPage, onPrevPage, onChangeLimit,}) =>
{
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage * limitPerPage >= totalTodos;
    const totalPages = Math.ceil(totalTodos / limitPerPage);

    return (
        <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center">
                <button
                    onClick={onPrevPage}
                    disabled={isFirstPage}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 transition-colors"
                >
                    Previous
                </button>
                <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
                <button
                    onClick={onNextPage}
                    disabled={isLastPage}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 transition-colors"
                >
                    Next
                </button>
            </div>

            <div className="flex items-center justify-center gap-2">
                <label htmlFor="limit-select" className="text-gray-700 text-sm">
                    Items per page:
                </label>
                <select
                    id="limit-select"
                    value={limitPerPage}
                    onChange={(e) => onChangeLimit(Number(e.target.value))}
                    className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
            </div>
        </div>
    );
};

export default PaginationControls;
