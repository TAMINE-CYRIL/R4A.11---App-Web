import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoItem from "./components/TodoItem/TodoItem";
import TodoFormCategory from "./components/TodoFormCategory/TodoFormCategory";
import taches from "./taches.json";
import TodoCategory from "./components/TodoCategory/TodoCategory";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortCriteria, setSortCriteria] = useState("");
    const [relations, setRelations] = useState([]);

    useEffect(() => {
        setTasks(taches.taches);
        setCategories(taches.categories);
        setRelations(taches.relations);
    }, []);

    const getCategoryForTask = (taskId) => {
        const relation = relations.find((e) => e.tache === taskId);
        return relation ? categories.find((category) => category.id === relation.categorie) : null;
    };

    const handleAddCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    const handleDeleteCategory = (categoryId) => {
        setCategories(categories.filter((category) => category.id !== categoryId));
    };

    const handleEditCategory = (categoryId, updatedCategory) => {
        setCategories(categories.map((category) =>
            category.id === categoryId ? { ...category, ...updatedCategory } : category
        ));
    };

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);

        if (newTask.category !== null) {
            const newRelation = {
                tache: newTask.id,
                categorie: newTask.category
            };
            setRelations([...relations, newRelation]);
        }
    };


    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        setRelations(relations.filter((relation) => relation.tache !== taskId));
    };


    const handleEditTask = (taskId, updatedTask) => {
        setTasks(tasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedTask } : task
        ));
    };

    const handleSortChange = (newSort) => {
        setSortCriteria(newSort.target.value);
        sortTasks(newSort.target.value);
    };

    const sortTasks = (criteria) => {
        const sortedTasks = [...tasks];
        switch (criteria) {
            case "title":
                sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "date_echeance":
                sortedTasks.sort((a, b) => new Date(a.date_echeance) - new Date(b.date_echeance));
                break;
            case "date_creation":
                sortedTasks.sort((a, b) => new Date(a.date_creation) - new Date(b.date_creation));
                break;
            default:
                return tasks;
        }
        setTasks(sortedTasks);
    };

    console.log(tasks)

    return (
        <div>
            <Header taskCount={tasks.length} />
            <TodoCategory categories={categories} onDelete={handleDeleteCategory} onEdit={handleEditCategory} />

            <div>
                <h1>Liste des tâches</h1>

                <label htmlFor="sort">Trier par :</label>
                <select id="sort" value={sortCriteria} onChange={handleSortChange}>
                    <option value="title">Titre</option>
                    <option value="date_echeance">Date d'écheance</option>
                    <option value="date_creation">Date de création</option>
                </select>
            </div>

            <TodoItem
                tasks={tasks}
                categories={categories}
                relations={relations}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
                getCategoryForTask={getCategoryForTask}
            />
            <TodoForm onAddTask={handleAddTask} categories={categories} />
            <TodoFormCategory onAddCategory={handleAddCategory} />
        </div>
    );
}
