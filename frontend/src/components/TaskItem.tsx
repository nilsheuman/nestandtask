import React, { useState } from 'react';
import { Task } from '../types';

export const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const [showSubtasks, setShowSubtasks] = useState(true);

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
    </div>
  )
};