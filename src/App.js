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
    const [sortCriteria, setSortCriteria] = useState("title");

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

    const handleEditCategory = (categoryId, updatedCategory) => {
        setCategories(categories.map((category) =>
            category.id === categoryId ? { ...category, ...updatedCategory } : category
        ));
    };

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const handleEditTask = (taskId, updatedTask) => {
        setTasks(tasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedTask } : task
        ));
    };

    const handleSortChange = (newSort) => {
        setSortCriteria(newSort.target.value);
        sortTasks(newSort.target.value);
    }


    const sortTasks = (criteria) => {
        const sortedTasks = [...tasks];
        switch (criteria) {
            case "title":
                sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
                break;
                case "description":
                    sortedTasks.sort((a, b) => a.description.localeCompare(b.description));
                    break;
            case "date":
                sortedTasks.sort((a, b) => new Date(a.date_echeance) - new Date(b.date_echeance));
                break;
                default:
                    return tasks;
        }
        setTasks(sortedTasks);

    }





        return (
            <div>
            <Header taskCount={tasks.length} />
                <TodoCategory categories={categories} onDelete={handleDeleteCategory} onEdit={handleEditCategory} />

                <div>
                    <h1>Liste des tâches</h1>

                        <label htmlFor="sort">Trier par :</label>
                        <select id="sort" value={sortCriteria} onChange={handleSortChange}>
                            <option value="name">Nom</option>
                            <option value="description">Description</option>
                            <option value="date">Date</option>
                        </select>
                    </div>
                <TodoItem tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
        <TodoForm onAddTask={handleAddTask} />
        <TodoFormCategory onAddCategory={handleAddCategory} />


            </div>
    );

}
