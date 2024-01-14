import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListIcon from '@/assets/icons/ListIcon';

interface TaskListProps {
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, updatedTask: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onDeleteTask, onUpdateTask }) => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/tasks');

        if (response.status === 200) {
          setTasks(response.data);
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching tasks:');
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:4000/tasks/${id}`);

      if (response.status === 200) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        onDeleteTask(id);
        
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting task:');
    }
  };

  const handleUpdateTask = async (id: string, updatedTask: string) => {
    try {
      const response = await axios.put(`http://localhost:4000/tasks/${id}`, {
        description: updatedTask,
      });

      if (response.status === 200) {
        setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, description: updatedTask } : task
        )
      );
        onUpdateTask(id, updatedTask);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error updating task:');
    }
  };

  return (
    <div className="task-list-container">
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          
          <p>Title: {task.title}</p>
          <p>Description: {task.description}</p>
          <p>Status: {task.status}</p>
          
          <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          <button onClick={() => handleUpdateTask(task._id, prompt('Enter updated task:', task.description) || '')}>
            Update
          </button>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default TaskList;
