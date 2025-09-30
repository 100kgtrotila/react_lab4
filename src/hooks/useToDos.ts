import { useState, useEffect } from "react";
import type { Todo } from "../types/todo";

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
                const response = await fetch(`${API_URL}?limit=10`);
                const data = await response.json();
                setTodos(data.todos);
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

    const toggleTodo = (id: number) => {
        setTodos((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const deleteTodo = (id: number) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    return {
        todos,
        isLoading,
        error,
        addTodo,
        toggleTodo,
        deleteTodo,
    };
};
