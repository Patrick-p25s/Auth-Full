import { useState, useEffect, useCallback } from "react";
import * as todoService from "../../services/todoService";

export function useTodos() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await todoService.getAllTasks();
      setTasks(data);
    } catch {
      setError("Impossible de charger les tâches");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async ({ tache, category }) => {
    const newTask = await todoService.createTask({ tache, category });
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = async (id, data) => {
    const updated = await todoService.updateTask(id, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const removeTask = async (id) => {
    await todoService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleFinish = async (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, is_completed: !t.is_completed } : t,
      ),
    );
    try {
      await todoService.finishTask(id);
    } catch {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, is_completed: !t.is_completed } : t,
        ),
      );
      setError("Impossible de mettre à jour la tâche");
    }
  };

  return { tasks, loading, error, addTask, editTask, removeTask, toggleFinish };
}
