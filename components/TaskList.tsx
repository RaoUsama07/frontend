import React, { useEffect, useState } from "react";
import axios from "axios";
import ListIcon from "@/assets/icons/ListIcon";
import { Button } from "@/components/ui/button";

interface TaskListProps {
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, updatedTask: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onDeleteTask, onUpdateTask }) => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/tasks");

        if (response.status === 200) {
          setTasks(response.data);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching tasks:");
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
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting task:");
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

            <Button
              variant="destructive"
              onClick={() => handleDeleteTask(task._id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
