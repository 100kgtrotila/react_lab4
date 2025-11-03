// src/hooks/useToDos.ts
import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Todo } from '../types/todo';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/todos';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(10);
    const [totalTodos, setTotalTodos] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            setIsLoading(true);
            setError(null);
            const skip = (currentPage - 1) * limitPerPage;
            try {
                const response = await axios.get(`${API_URL}?limit=${limitPerPage}&skip=${skip}`);
                setTodos(response.data.todos);
                setTotalTodos(response.data.total);
            } catch (err: any) {
                setError(err.message || "Error fetching todos");
            } finally {
                setIsLoading(false);
            }
        };
        fetchTodos();
    }, [currentPage, limitPerPage]);

    const filteredTodos = useMemo(() => {
        if (!searchTerm.trim()) {
            return todos;
        }
        return todos.filter(todo =>
            todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [todos, searchTerm]);

    const addTodo = useCallback((todoText: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            todo: todoText,
            completed: false,
            userId: 999, // Mock ID
        };
        setTodos(prev => [newTodo, ...prev]);
    }, []);

    const toggleTodo = useCallback((id: number) => {
        setTodos(prev =>
            prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
    }, []);

    const deleteTodo = useCallback((id: number) => {
        setTodos(prev => prev.filter(t => t.id !== id));
    }, []);

    const editTodoText = useCallback((id: number, newText: string) => {
        setTodos(prev =>
            prev.map(t => (t.id === id ? { ...t, todo: newText } : t))
        );
    }, []);

    const goToNextPage = useCallback(() => {
        setCurrentPage(prev => (prev * limitPerPage < totalTodos ? prev + 1 : prev));
    }, [limitPerPage, totalTodos]);

    const goToPrevPage = useCallback(() => {
        setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
    }, []);

    const changeLimit = useCallback((newLimit: number) => {
        setLimitPerPage(newLimit);
        setCurrentPage(1);
    }, []);

    return {
        todos: filteredTodos,
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
    };
};
