import React from 'react';
import TodoItem from './TodoItem';
import type { Todo } from '../types/todo';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit }) => {
    if (todos.length === 0) {
        return <p className="text-center text-gray-500">No tasks yet. Add one!</p>;
    }

    return (
        <ul>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
};

export default React.memo(TodoList);
