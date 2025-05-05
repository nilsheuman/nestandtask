import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { useTasks } from '../context/TaskContext';

export const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const [showSubtasks, setShowSubtasks] = useState(true);
  const [title, setTitle] = useState('');
  const { addTask } = useTasks();

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '0.75rem',
        margin: '0.5rem 0',
        backgroundColor: task.parentId ? '#f9f9f9' : '#fff',
        marginLeft: task.parentId ? '2rem' : '0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <strong>{task.title}</strong>
        </div> 
      </div>

      {showSubtasks && task.subtasks && task.subtasks.length > 0 && (
        <div>
          {task.subtasks.map((subtask: Task) => (
            <TaskItem key={subtask.id} task={subtask} />
          ))}
        </div>
      )}

      {task.parentId === undefined && (
        <div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Subtask" />
          <button onClick={() => { addTask(title, task.id); setTitle(''); }}>Add Subtask</button>
        </div>
      )}
      
    </div>
  )
};