import React, { useState } from "react";
import axios from "axios";
import PlusIcon from "@/assets/icons/PlusIcon";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface TaskBarProps {
  onAddTask: (task: string) => void;
}

const TaskBar: React.FC<TaskBarProps> = ({ onAddTask }) => {
  const [task, setTask] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const { toast } = useToast();

  const handleAddTask = async () => {
    if (title.trim() && description.trim()) {
      try {
        const response = await axios.post("http://localhost:4000/tasks/", {
          title: title.trim(),
          description: description.trim(),
          status,
        });

        if (response.status === 201) {
          onAddTask(title.trim());
          setTask("");
          setShowForm(false);
          toast({
            title: "Task created successfully",
            description: "The task has been added.",
            status: "success",
          });
        } else {
          console.error("Unexpected response status:", response.status);
          toast({
            title: "Error",
            description: "An unexpected error occurred. Task not created.",
            status: "error",
          });
        }
      } catch (error) {
        console.error("Error adding task:");
        toast({
          title: "Error",
          description: "An unexpected error occurred. Task not created.",
          status: "error",
        });
      }
    }
  };

  return (
    <div className="task-bar-container">
      <div className="textarea-container">
        <Textarea
          placeholder="Add new task..."
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="plus-icon-button"
          onClick={() => setShowForm(!showForm)}
        >
          <PlusIcon onClick={undefined} />
        </button>
      </div>
      {showForm && (
        <div className="form-container">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <Button onClick={handleAddTask}>Add</Button>
        </div>
      )}
    </div>
  );
};

export default TaskBar;
