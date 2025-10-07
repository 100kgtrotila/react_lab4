import { useState, useEffect, useMemo } from "react";
import type { Todo } from "../types/todo";
import axios from 'axios';

const API_URL = "https://dummyjson.com/todos";

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(10);
    const [totalTodos, setTotalTodos] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

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
        return todos.filter((todo) =>
            todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [todos, searchTerm]);

    const goToNextPage = () => {
        if (currentPage * limitPerPage < totalTodos) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    // --- НОВА ФУНКЦІЯ ---
    const changeLimit = (newLimit: number) => {
        setLimitPerPage(newLimit);
        setCurrentPage(1); // Скидаємо на першу сторінку
    };

    const addTodo = (todoText: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            todo: todoText,
            completed: false,
        };
        setTodos((prev) => [newTodo, ...prev]);
    };

    const toggleTodo = async (id: number) => {
        if (id > 1000) {
            setTodos((prev) =>
                prev.map((t) =>
                    t.id === id ? { ...t, completed: !t.completed } : t
                )
            );
            return;
        }

        const todoToUpdate = todos.find(t => t.id === id);
        if (!todoToUpdate) return;

        try {
            const response = await axios.put(`${API_URL}/${id}`, {
                completed: !todoToUpdate.completed,
            });
            setTodos((prev) =>
                prev.map((t) => (t.id === id ? response.data : t))
            );
        } catch (err) {
            console.error("Failed to update todo:", err);
        }
    };

    const deleteTodo = async (id: number) => {
        if (id > 1000) {
            setTodos((prev) => prev.filter((t) => t.id !== id));
            return;
        }

        const originalTodos = [...todos];
        setTodos((prev) => prev.filter((t) => t.id !== id));

        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (err) {
            console.error("Failed to delete todo:", err);
            setTodos(originalTodos);
        }
    };

    const editTodoText = async (id: number, newText: string) => {
        if (id > 1000) {
            setTodos((prev) =>
                prev.map((t) => (t.id === id ? { ...t, todo: newText } : t))
            );
            return;
        }

        const originalTodos = [...todos];
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, todo: newText } : t))
        );

        try {
            await axios.put(`${API_URL}/${id}`, {
                todo: newText,
            });
        } catch (err) {
            console.error("Failed to edit todo:", err);
            setTodos(originalTodos);
        }
    };

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
