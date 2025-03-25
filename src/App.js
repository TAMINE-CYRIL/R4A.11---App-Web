import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoItem from "./components/TodoItem/TodoItem";
import TodoFormCategory from "./components/TodoFormCategory/TodoFormCategory";
import TaskFilters from "./components/TaskFilters/TaskFilters";
//import taches from "./taches.json";
import TodoCategory from "./components/TodoCategory/TodoCategory";
import ImportJSON from "./components/ImportJSON/ImportJSON";

const ETAT_TERMINE = ['Reussi', 'Abandonné'];

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortCriteria, setSortCriteria] = useState("date_echeance");
    const [relations, setRelations] = useState([]);
    const [view, setView] = useState("import");

    const [filters, setFilters] = useState({
        category: "",
        state: "",
        searchTerm: "",
        showUrgent: false,
        showDone: false,
        showNotDone: true
    });

    /*
    useEffect(() => {
        setTasks(taches.taches);
        setCategories(taches.categories);
        setRelations(taches.relations);
    }, []);
*/
    const getCategoryForTask = (taskId) => {
        const relation = relations.find((e) => e.tache === taskId);
        return relation ? categories.find((category) => category.id === relation.categorie) : null;
    };

    const handleAddCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    const handleDeleteCategory = (categoryId) => {
        setCategories(categories.filter((category) => category.id !== categoryId));

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
        setTasks(tasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedTask } : task
        ));

        const existingRelation = relations.find(rel => rel.tache === taskId);

        if (updatedTask.categorie_id) {
            const newCategoryId = parseInt(updatedTask.categorie_id);

            if (existingRelation) {
                setRelations(relations.map(rel =>
                    rel.tache === taskId ? { ...rel, categorie: newCategoryId } : rel
                ));
            } else {
                setRelations([...relations, { tache: taskId, categorie: newCategoryId }]);
            }
        } else if (existingRelation) {
            setRelations(relations.filter(rel => rel.tache !== taskId));
        }
    };

    const handleToggleView = () => {
        if (view === "import"){
            setView("import");
        }
        else if (view === "view"){
            setView("view");
        }
        else {
            setView("categories");
        }
        //setView(view === "taches" ? "categories" : "taches");
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
        if (filters.category && filters.category !== "") {
            const taskCategory = getCategoryForTask(task.id);
            if (!taskCategory || taskCategory.id !== parseInt(filters.category)) {
                return false;
            }
        }

        if (filters.state && filters.state !== "") {
            if (task.etat !== filters.state) {
                return false;
            }
        }

        if (filters.searchTerm && filters.searchTerm !== "") {
            const searchLower = filters.searchTerm.toLowerCase();
            const titleLower = task.title.toLowerCase();
            const descLower = task.description ? task.description.toLowerCase() : "";

            if (!titleLower.includes(searchLower) && !descLower.includes(searchLower)) {
                return false;
            }
        }

        if (filters.showUrgent && !task.urgent) {
            return false;
        }

        const isDone = isTaskDone(task);
        return !((filters.showDone && !isDone) || (filters.showNotDone && isDone));


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

    const totalTasks = tasks.length;
    const unfinishedTasks = tasks.filter(task => !ETAT_TERMINE.includes(task.etat)).length;

    return (
        <div>
            <Header taskCount={totalTasks} unfinishedCount={unfinishedTasks} />


            {view === "import" && (
                <ImportJSON></ImportJSON>
            )}

            {view === "taches" && (
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
            )}

            {( view === "categorie" &&
                <section>
                    <h1>Liste des catégories</h1>
                    <TodoCategory categories={categories} onDelete={handleDeleteCategory} onEdit={handleEditCategory} />
                    <TodoFormCategory onAddCategory={handleAddCategory} />
                </section>
            )}

            <Footer view={view} onToggleView={handleToggleView} />

        </div>
    );
}