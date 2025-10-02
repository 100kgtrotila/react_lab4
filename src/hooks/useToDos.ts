import { useState, useEffect } from "react";
import type { Todo } from "../types/todo";
import axios from 'axios';

const API_URL = "https://dummyjson.com/todos";

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTodos = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_URL}?limit=10`);
                setTodos(response.data.todos);
            } catch (err: any) {
                setError(err.message || "Error fetching todos");
            } finally {
                setIsLoading(false);
            }
        };
        fetchTodos();
    }, []);

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

    const editTodoText = (id: number, newText: string) => {
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, todo: newText } : t))
        );
    };

    return {
        todos,
        isLoading,
        error,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodoText,
    };
};
