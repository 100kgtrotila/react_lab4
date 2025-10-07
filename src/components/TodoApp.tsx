import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import PaginationControls from './PaginationControls';
import SearchInput from './SearchInput';
import { useTodos } from '../hooks/useToDos';

const TodoApp: React.FC = () => {
    const {
        todos,
        isLoading,
        error,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodoText,
        currentPage,
        totalTodos,
        limitPerPage,
        goToNextPage,
        goToPrevPage,
        changeLimit,
        searchTerm,
        setSearchTerm,
    } = useTodos();

    return (
        <div className="max-w-xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">My To-Do List</h1>

            <AddTodoForm onAddTodo={addTodo} />
            <SearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            {isLoading && <div className="text-center py-4">Loading...</div>}
            {error && <div className="text-center text-red-500 py-4">Error: {error}</div>}

            {!isLoading && !error && (
                <TodoList
                    todos={todos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodoText}
                />
            )}

            <PaginationControls
                currentPage={currentPage}
                totalTodos={totalTodos}
                limitPerPage={limitPerPage}
                onNextPage={goToNextPage}
                onPrevPage={goToPrevPage}
                onChangeLimit={changeLimit}
            />
        </div>
    );
};

export default TodoApp;
