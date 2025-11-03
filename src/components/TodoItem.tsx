import React, { useState, useCallback } from 'react';
import { PiTrash, PiPencilSimple } from "react-icons/pi";
import type { Todo } from '../types/todo';

const MemoizedPencilIcon = React.memo(PiPencilSimple);
const MemoizedTrashIcon = React.memo(PiTrash);

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.todo);

    const handleToggle = useCallback(() => {
        onToggle(todo.id);
    }, [onToggle, todo.id]);

    const handleDelete = useCallback(() => {
        onDelete(todo.id);
    }, [onDelete, todo.id]);

    const handleEdit = useCallback(() => {
        setIsEditing(prev => !prev);
    }, []);

    const handleEditSave = () => {
        if (editText.trim()) {
            onEdit(todo.id, editText);
            setIsEditing(false);
        }
    };

    const handleDoubleClick = useCallback(() => {
        setIsEditing(true);
    }, []);

    return (
        <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-3">
            <div className="flex items-center flex-grow">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggle}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleEditSave}
                        onKeyDown={(e) => e.key === 'Enter' && handleEditSave()}
                        className="ml-3 text-lg flex-grow border-b-2 border-blue-500 outline-none"
                        autoFocus
                    />
                ) : (
                    <span
                        className={`ml-3 text-lg ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}
                        onDoubleClick={handleDoubleClick}
                    >
                        {todo.todo}
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={handleEdit}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                    <MemoizedPencilIcon size={22} />
                </button>
                <button
                    onClick={handleDelete}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                >
                    <MemoizedTrashIcon size={22} />
                </button>
            </div>
        </li>
    );
};

export default React.memo(TodoItem);
