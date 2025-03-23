import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoItem from "./components/TodoItem/TodoItem";
import TodoFormCategory from "./components/TodoFormCategory/TodoFormCategory";
import taches from "./taches.json";
import TodoCategory from "./components/TodoCategory/TodoCategory";

const ETAT_TERMINE = ['Réussi', 'Abandonné'];

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortCriteria, setSortCriteria] = useState("date_echeance");
    const [relations, setRelations] = useState([]);
    const [view, setView] = useState("taches");

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
    };

    const filteredTasks = tasks.filter((task) => !ETAT_TERMINE.includes(task.etat));

    const getFilteredAndSortedTasks = () => {
        const tasksCopy = [...filteredTasks];

        switch (sortCriteria) {
            case "title":
                return tasksCopy.sort((a, b) => a.title.localeCompare(b.title));
            case "date_echeance":
                return tasksCopy.sort((a, b) => new Date(a.date_echeance) - new Date(b.date_echeance));
            case "date_creation":
                return tasksCopy.sort((a, b) => new Date(a.date_creation) - new Date(b.date_creation));
            default:
                return tasksCopy.sort((a, b) => new Date(a.date_echeance) - new Date(b.date_echeance));
        }
    };

    return (
        <div>
            <Header taskCount={tasks.length} />

            {view === "taches" ? (
                <div>
                    <h1>Liste des tâches</h1>
                    <label htmlFor="sort">Trier par :</label>
                    <select id="sort" value={sortCriteria} onChange={handleSortChange}>
                        <option value="title">Titre</option>
                        <option value="date_echeance">Date d'échéance</option>
                        <option value="date_creation">Date de création</option>
                    </select>

                    <TodoItem
                        tasks={getFilteredAndSortedTasks()}
                        categories={categories}
                        relations={relations}
                        onDelete={handleDeleteTask}
                        onEdit={handleEditTask}
                        getCategoryForTask={getCategoryForTask}
                    />
                    <TodoForm onAddTask={handleAddTask} categories={categories} />
                </div>
            ) : (
                <section>
                    <h1>Liste des catégories</h1>
                    <TodoCategory categories={categories} onDelete={handleDeleteCategory} onEdit={handleEditCategory} />
                    <TodoFormCategory onAddCategory={handleAddCategory} />
                </section>
            )}

            <button onClick={() => setView(view === "taches" ? "categories" : "taches")}>
                {view === "taches" ? "Voir les catégories" : "Voir les tâches"}
            </button>
        </div>
    );
}