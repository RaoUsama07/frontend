import React, { useState } from 'react';
import axios from 'axios';
import PlusIcon from "@/assets/icons/PlusIcon";
import '@/styles/styles.css';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'shadcn-ui';
import { Input } from "shadcn-ui";
import { Label } from "shadcn-ui";
import { Button } from "shadcn-ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "shadcn-ui";
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
  const [inputValue, setInputValue] = React.useState("");

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
    // <Card className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
    //   <CardHeader>
    //     <CardTitle>Add new task</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <form>
    //       <div className="flex flex-col mb-4">
    //         <Label htmlFor="taskInput">Your todos</Label>
    //         <Input
    //           id="taskInput"
    //           placeholder="Enter your task"
    //           value={inputValue}
    //           onChange={(e) => setInputValue(e.target.value)}
    //           className="border p-2 rounded-md"
    //         />
    //       </div>
    //     </form>
    //   </CardContent>
    //   <CardFooter className="flex justify-end">
    //     <Button variant="outline" className="mr-2">Cancel</Button>
    //     <Button>Save</Button>
    //   </CardFooter>
    // </Card>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
};

export default TaskBar;
