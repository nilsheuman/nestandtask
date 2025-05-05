import { Task } from "../entities/tasks.entity";

export interface TaskDto {
  id: number;
  title: string;
  parentId?: number;
  subtasks?: TaskDto[];
}

export function taskToDto(task: Task): TaskDto {
  return {
    id: task.id,
    title: task.title,
    parentId: task.parent?.id,
    subtasks: task.subtasks?.map((subtask) => taskToDto(subtask)),
  };
}