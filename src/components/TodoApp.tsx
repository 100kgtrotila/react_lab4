import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import { useTodos } from '../hooks/useToDos';

const TodoApp: React.FC = () => {
    const { todos, isLoading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
    return (
        <div className="max-w-xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">My To-Do List</h1>

            {/* Передаємо addTodo у форму */}
            <AddTodoForm onAddTodo={addTodo} />

            {isLoading && <div className="text-center">Loading...</div>}
            {error && <div className="text-center text-red-500">Error: {error}</div>}

            {/* Передаємо todos та функції у список */}
            <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </div>
    );
};

export default TodoApp;
