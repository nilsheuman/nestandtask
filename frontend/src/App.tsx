import React, { useState } from 'react';
import { TaskProvider, useTasks } from './context/TaskContext';
import { TaskList } from './components/TaskList';

const Main = () => {
  const [title, setTitle] = useState('');
  const { addTask } = useTasks();

  return (
    <div>
      <h1>Task Manager</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Task" />
      <button onClick={() => { addTask(title); setTitle(''); }}>Add Task</button>
      <TaskList />
    </div>
  );
};

const App = () => (
  <TaskProvider>
    <Main />
  </TaskProvider>
);

export default App;
