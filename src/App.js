import React, {useEffect, useState} from "react";
import Header from "./components/Header/Header";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoItem from "./components/TodoItem/TodoItem";
import TodoFormCategory from "./components/TodoFormCategory/TodoFormCategory";
import taches from "./taches.json";
import TodoCategory from "./components/TodoCategory/TodoCategory";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setTasks(taches.taches);
    }, []);

    useEffect(() => {
            setCategories(taches.categories);
        },
        [])



    const handleAddCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    const handleDeleteCategory = (categoryId) => {
        setCategories(categories.filter((category) => category.id !== categoryId));
    }

    const handleEditCategory = (categoryId, newText) => {
        setCategories(categories.map((category) =>
            category.id === categoryId ? { ...category, text: newText } : category
        ));    }

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
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
                <TodoCategory categories={categories} onDelete={handleDeleteCategory} onEdit={handleEditCategory} />
                <TodoItem tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
        <TodoForm onAddTask={handleAddTask} />
        <TodoFormCategory onAddCategory={handleAddCategory} />


            </div>
    );

}
