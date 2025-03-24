import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoItem from "./components/TodoItem/TodoItem";
import TodoFormCategory from "./components/TodoFormCategory/TodoFormCategory";
import TaskFilters from "./components/TaskFilters/TaskFilters";
import taches from "./taches.json";
import TodoCategory from "./components/TodoCategory/TodoCategory";

const ETAT_TERMINE = ['Réussi', 'Reussi', 'Abandonné'];

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortCriteria, setSortCriteria] = useState("date_echeance");
    const [relations, setRelations] = useState([]);
    const [view, setView] = useState("taches");

    // Filtres
    const [filters, setFilters] = useState({
        category: "",
        state: "",
        searchTerm: "",
        showUrgent: false,
        showDone: false,
        showNotDone: true
    });

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
        // Supprimer la catégorie
        setCategories(categories.filter((category) => category.id !== categoryId));

        // Supprimer les relations associées à cette catégorie
        setRelations(relations.filter((relation) => relation.categorie !== categoryId));
    };

    const handleEditCategory = (categoryId, updatedCategory) => {
        setCategories(categories.map((category) =>
            category.id === categoryId ? { ...category, ...updatedCategory } : category
        ));
    };

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);

        if (newTask.category && newTask.category !== "") {
            const newRelation = {
                tache: newTask.id,
                categorie: parseInt(newTask.category)
            };
            setRelations([...relations, newRelation]);
        }
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        setRelations(relations.filter((relation) => relation.tache !== taskId));
    };

    const handleEditTask = (taskId, updatedTask) => {
        // Mise à jour de la tâche
        setTasks(tasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedTask } : task
        ));

        // Gestion de la relation avec la catégorie
        const existingRelation = relations.find(rel => rel.tache === taskId);

        if (updatedTask.categorie_id) {
            const newCategoryId = parseInt(updatedTask.categorie_id);

            if (existingRelation) {
                // Mettre à jour la relation existante
                setRelations(relations.map(rel =>
                    rel.tache === taskId ? { ...rel, categorie: newCategoryId } : rel
                ));
            } else {
                // Créer une nouvelle relation
                setRelations([...relations, { tache: taskId, categorie: newCategoryId }]);
            }
        } else if (existingRelation) {
            // Supprimer la relation si aucune catégorie n'est sélectionnée
            setRelations(relations.filter(rel => rel.tache !== taskId));
        }
    };

    const handleSortChange = (newSort) => {
        setSortCriteria(newSort.target.value);
    };

    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
    };

    const isTaskDone = (task) => {
        return ETAT_TERMINE.includes(task.etat);
    };

    const filteredTasks = tasks.filter((task) => {
        // Filtre par catégorie
        if (filters.category && filters.category !== "") {
            const taskCategory = getCategoryForTask(task.id);
            if (!taskCategory || taskCategory.id !== parseInt(filters.category)) {
                return false;
            }
        }

        // Filtre par état
        if (filters.state && filters.state !== "") {
            if (task.etat !== filters.state) {
                return false;
            }
        }

        // Filtre par texte (recherche)
        if (filters.searchTerm && filters.searchTerm !== "") {
            const searchLower = filters.searchTerm.toLowerCase();
            const titleLower = task.title.toLowerCase();
            const descLower = task.description ? task.description.toLowerCase() : "";

            if (!titleLower.includes(searchLower) && !descLower.includes(searchLower)) {
                return false;
            }
        }

        // Filtre par urgence
        if (filters.showUrgent && !task.urgent) {
            return false;
        }

        // Filtre par statut (fait/pas fait)
        const isDone = isTaskDone(task);
        if ((filters.showDone && !isDone) || (filters.showNotDone && isDone)) {
            return false;
        }

        return true;
    });

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

    // Calcul des statistiques pour l'en-tête
    const totalTasks = tasks.length;
    const unfinishedTasks = tasks.filter(task => !ETAT_TERMINE.includes(task.etat)).length;

    return (
        <div>
            <Header taskCount={totalTasks} unfinishedCount={unfinishedTasks} />

            {view === "taches" ? (
                <div>
                    <h1>Liste des tâches</h1>

                    <div>
                        <div>
                            <label htmlFor="sort">Trier par :</label>
                            <select id="sort" value={sortCriteria} onChange={handleSortChange}>
                                <option value="title">Titre</option>
                                <option value="date_echeance">Date d'échéance</option>
                                <option value="date_creation">Date de création</option>
                            </select>
                        </div>
                    </div>

                    <TaskFilters
                        categories={categories}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />

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