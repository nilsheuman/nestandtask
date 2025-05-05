import axios from 'axios';
import { Task } from './types';

const API_BASE = '/api/tasks';
const API_SUB = API_BASE + '/:id/subtasks';

export const fetchTasks = async (): Promise<Task[]> => {
    const res = await axios.get(API_BASE);
    return Array.isArray(res.data) ? res.data : [];
  };
  
export const fetchSubTasks = async (id: number): Promise<Task[]> => {
    const res = await axios.get(API_SUB.replace(":id", String(id)));
    return Array.isArray(res.data) ? res.data : [];
  };

export const createTask = async (title: string, parentId?: number): Promise<Task> => {
  const res = await axios.post(API_BASE, { title, parentId });
  return res.data;
};
