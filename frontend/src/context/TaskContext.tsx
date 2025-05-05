import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../types';
import { fetchTasks, createTask, fetchSubTasks } from '../api';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, parentId?: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const populateTasks = (tasks: Task[]) => {
    Promise.all(tasks.map(async (task) => {
      if (task.subtasks && task.subtasks.length > 0) {
        const subtasks = await fetchSubTasks(task.id);
        task.subtasks = subtasks;
      }
      return task;
    })).then((populatedTasks) => {
      setTasks(populatedTasks);
    })
  }

  useEffect(() => {
    fetchTasks().then(populateTasks);
  }, []);

  const addTask = async (title: string, parentId?: number) => {
    const newTask = await createTask(title, parentId);
    fetchTasks().then(populateTasks);
  };

  return <TaskContext.Provider value={{ tasks, addTask }}>{children}</TaskContext.Provider>;
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};
