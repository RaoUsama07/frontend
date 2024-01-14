import React, { useState } from 'react';
import axios from 'axios';
import PlusIcon from "@/assets/icons/PlusIcon";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from 'lucide-react';

interface TaskBarProps {
  onAddTask: (task: string) => void;
}

const TaskBar: React.FC<TaskBarProps> = ({ onAddTask }) => {
  const [task, setTask] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [alert, setAlert] = useState({ show: false, variant: 'success', message: '' });

  const handleAddTask = async () => {
    if (title.trim() && description.trim()) {
      try {
        const response = await axios.post('http://localhost:4000/tasks/', {
          title: title.trim(),
          description: description.trim(),
          status,
        });

        if (response.status === 201) {
          onAddTask(title.trim());
          setTask('');
          setShowForm(false);
          setAlert({ show: true, variant: 'success', message: 'Task created successfully' });
        } else {
          console.error('Unexpected response status:', response.status);
          setAlert({ show: true, variant: 'danger', message: 'Task not created. An unexpected error occurred.' });
        }
      } catch (error) {
        console.error('Error adding task:');
        setAlert({ show: true, variant: 'danger', message: 'Task not created. An unexpected error occurred.' });
      }
    }
  };

  return (
    <div className="task-bar-container">
      <input
        type="text"
        placeholder="Add new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <PlusIcon onClick={() => setShowForm(!showForm)} />
      {showForm && (
        <div className="form-container">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={handleAddTask}>Add</button>
        </div>
      )}
      {alert.show && (
        <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Created
        </AlertDescription>
      </Alert>
      )}
    </div>
  );
};

export default TaskBar;
