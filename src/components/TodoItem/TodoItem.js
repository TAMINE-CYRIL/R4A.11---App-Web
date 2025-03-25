import React, { useState } from "react";
import styles from './TodoItem.module.css';

export default function TodoItem({ tasks, categories, onDelete, onEdit, getCategoryForTask }) {
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTask, setEditTask] = useState({});

    const getCategoryName = (taskId) => {
        const category = getCategoryForTask(taskId);
        return category && category.title ? category.title : 'Aucune catégorie';
    };

    const getCategoryEmoji = (taskId) => {
        const category = getCategoryForTask(taskId);
        return category && category.emoji ? category.emoji : '';
    };

    const getCategoryColor = (taskId) => {
        const category = getCategoryForTask(taskId);
        return category && category.color ? category.color : 'inherit';
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditTask((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleEditSave = () => {
        onEdit(editTaskId, editTask);
        setEditTaskId(null);
    };

    const isTaskCompleted = (etat) => {
        return etat === "Reussi" || etat === "Abandonné";
    };

    const openEditPopup = (task) => {
        const categoryId = getCategoryForTask(task.id)?.id || "";
        setEditTaskId(task.id);
        setEditTask({...task, categorie_id: categoryId.toString()});
    };

    return (
        <section>
            {tasks.length === 0 ? (
                <p className={styles.emptyState}>Aucune tâche ne correspond à vos critères de filtrage.</p>
            ) : (
                <ul className={styles.list}>
                    {tasks.map((task) => {
                        const categoryName = getCategoryName(task.id);
                        const categoryEmoji = getCategoryEmoji(task.id);
                        const categoryColor = getCategoryColor(task.id);
                        const completed = isTaskCompleted(task.etat);

                        return (
                            <li key={task.id} className={styles.listItem}>
                                {editTaskId === task.id && (
                                    <div className={styles.popupOverlay}>
                                        <div className={styles.popupContent}>
                                            <button
                                                className={styles.closeButton}
                                                onClick={() => setEditTaskId(null)}
                                            >
                                                ×
                                            </button>
                                            <form>
                                                <h3>Modifier la Tâche</h3>
                                                <label htmlFor="title">Titre:</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={editTask.title}
                                                    onChange={handleEditChange}
                                                    placeholder="Modifier une tâche..."
                                                />
                                                <label htmlFor="date_echeance">Date d'échéance:</label>
                                                <input
                                                    type="date"
                                                    name="date_echeance"
                                                    value={editTask.date_echeance}
                                                    onChange={handleEditChange}
                                                />
                                                <label htmlFor="etat">État:</label>
                                                <select
                                                    name="etat"
                                                    value={editTask.etat}
                                                    onChange={handleEditChange}
                                                >
                                                    <option value="Nouveau">Nouveau</option>
                                                    <option value="En cours">En cours</option>
                                                    <option value="Reussi">Reussi</option>
                                                    <option value="En attente">En attente</option>
                                                    <option value="Abandonné">Abandonné</option>
                                                </select>
                                                <label htmlFor="description">Description:</label>
                                                <textarea
                                                    name="description"
                                                    placeholder="Description (optionnel)"
                                                    value={editTask.description}
                                                    onChange={handleEditChange}
                                                />
                                                <label htmlFor="categorie_id">Catégorie:</label>
                                                <select
                                                    name="categorie_id"
                                                    value={editTask.categorie_id || ""}
                                                    onChange={handleEditChange}
                                                >
                                                    <option value="">Aucune catégorie</option>
                                                    {categories.map((category) => (
                                                        <option key={category.id} value={category.id}>
                                                            {category.emoji || "📝"} {category.title}
                                                        </option>
                                                    ))}
                                                </select>
                                                <label>
                                                    Urgent ?
                                                    <input
                                                        type="checkbox"
                                                        name="urgent"
                                                        checked={editTask.urgent}
                                                        onChange={handleEditChange}
                                                    />
                                                </label>
                                                <div className={styles.taskActions}>
                                                    <button
                                                        type="button"
                                                        className={styles.editButton}
                                                        onClick={handleEditSave}
                                                    >
                                                        Sauvegarder
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={styles.deleteButton}
                                                        onClick={() => setEditTaskId(null)}
                                                    >
                                                        Annuler
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <h3
                                        className={styles.taskTitle}
                                        style={{
                                            textDecoration: completed ? 'line-through' : 'none',
                                            color: task.urgent ? "red" : "inherit"
                                        }}
                                    >
                                        {categoryEmoji} {task.title}
                                        {task.urgent}
                                    </h3>
                                    <p>Échéance : {task.date_echeance}</p>
                                    <p>Statut : <span style={{
                                        padding: "2px 6px",
                                        backgroundColor: completed ? "#d4edda" : "#f8d7da",
                                        color: completed ? "#155724" : "#721c24",
                                        borderRadius: "4px",
                                        fontSize: "0.9em"
                                    }}>{task.etat}</span></p>
                                    {task.description && <p className={styles.taskDescription}>Description : {task.description}</p>}
                                    <p>Catégorie : <span style={{ color: categoryColor }}>
                                        {categoryEmoji} {categoryName}
                                    </span></p>
                                    <div className={styles.taskActions}>
                                        <button
                                            className={styles.editButton}
                                            onClick={() => openEditPopup(task)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => onDelete(task.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}