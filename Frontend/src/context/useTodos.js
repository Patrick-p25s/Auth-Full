import { useCallback, useEffect, useState } from "react";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask as taskUpdate,
  deleteTask,
  toggleFinish,
} from "../api/todoService";

export function useTodos() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await await getAllTasks();
      setTasks(data);
    } catch {
      setErreur("Erreur de chargement des taches");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async ({ tache, category }) => {
    const newTask = await createTask({ tache, category });
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = async (id, data) => {
    const updated = await updateTask(id, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = async (id, taskData) => {
    try {
      await taskUpdate(id, taskData);
      const newCategory = taskData.category;
      const newTask = taskData.tache;
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, tache: newTask, category: newCategory }
            : task,
        ),
      );
    } catch (e) {
      console.log(e);
      setErreur("Erreur lors de modification ");
    }
  };

  const finishToogle = async (id) => {
    // 1. Mise à jour optimiste du state (ReacReactt interface)
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, is_completed: !t.is_completed } : t,
      ),
    );

    try {
      await toggleFinish(id);
    } catch (error) {
      // 2. Annulation (Rollback) si l'appel API échoue
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, is_completed: !task.is_completed } : task,
        ),
      );

      setErreur("Impossible de changer l'état de la tâche");
    }
  };

  return {
    tasks,
    loading,
    erreur,
    addTask,
    removeTask,
    finishToogle,
    updateTask,
  };
}
