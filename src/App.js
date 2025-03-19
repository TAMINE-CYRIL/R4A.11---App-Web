import React, { useState } from "react";
import Header from "./components/Header/Header";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoItem from "./components/TodoItem/TodoItem";

export default function App() {
    const [tasks, setTasks] = useState([]);

    const handleAddTask = (newTask) => {
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const handleEditTask = (taskId, newText) => {
        setTasks(tasks.map((task) =>
            task.id === taskId ? { ...task, text: newText } : task
        ));
    };

    return (
        <div>
            <Header taskCount={tasks.length} />
            <TodoForm onAddTask={handleAddTask} />
            <TodoItem tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
        </div>
    );
}
