"use client"
import React, { useState } from 'react';
import ProfilePicture from '../../components/ProfilePic';
import TaskBar from '../../components/TaskBar';
import TaskList from '../../components/TaskList';
import '@/styles/styles.css';
const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  const handleAddTask = (task: string) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="container">
      <ProfilePicture  />
      <TaskBar onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onDeleteTask={function (id: string): void {
        throw new Error('Function not implemented.');
      } } onUpdateTask={function (id: string, updatedTask: string): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
};

export default HomePage;
