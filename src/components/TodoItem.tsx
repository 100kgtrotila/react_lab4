import React from 'react';
import { PiTrash } from "react-icons/pi";
import type { TodoItemProps } from '../types/todo';

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    return (
        <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-3 transition-all hover:shadow-md">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className={`ml-3 text-lg ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
          {todo.todo}
        </span>
            </div>
            <button
                onClick={() => onDelete(todo.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label={`Delete task ${todo.todo}`}
            >
                <PiTrash size={22} />
            </button>
        </li>
    );
};

export default TodoItem;
