export interface Task {
    id: number;
    title: string;
    parentId?: number;
    subtasks?: Task[];
  }