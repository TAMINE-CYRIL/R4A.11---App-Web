import React, { useState } from "react";

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
        return etat === "Réussi" || etat === "Reussi"; // Handle both spellings
    };

    return (
        <section>
            <ul className="liste">
                {tasks.map((task) => {
                    const categoryName = getCategoryName(task.id);
                    const categoryEmoji = getCategoryEmoji(task.id);
                    const completed = isTaskCompleted(task.etat);

                    return (
                        <li key={task.id}>
                            {editTaskId === task.id ? (
                                <>
                                    <input
                                        type="text"
                                        name="title"
                                        value={editTask.title}
                                        onChange={handleEditChange}
                                    />
                                    <input
                                        type="date"
                                        name="date_echeance"
                                        value={editTask.date_echeance}
                                        onChange={handleEditChange}
                                    />
                                    <select
                                        name="etat"
                                        value={editTask.etat}
                                        onChange={handleEditChange}
                                    >
                                        <option value="Nouveau">Nouveau</option>
                                        <option value="En cours">En cours</option>
                                        <option value="Reussi">Réussi</option>
                                        <option value="En attente">En attente</option>
                                        <option value="Abandonné">Abandonné</option>
                                    </select>
                                    <textarea
                                        name="description"
                                        placeholder="Description (optionnel)"
                                        value={editTask.description}
                                        onChange={handleEditChange}
                                    />
                                    <label>
                                        Urgent ?
                                        <input
                                            type="checkbox"
                                            name="urgent"
                                            checked={editTask.urgent}
                                            onChange={handleEditChange}
                                        />
                                    </label>
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
                                    <button onClick={handleEditSave}>Sauvegarder</button>
                                    <button onClick={() => setEditTaskId(null)}>Annuler</button>
                                </>
                            ) : (
                                <>
                                    <h3 style={{
                                        textDecoration: completed ? 'line-through' : 'none',
                                        color: task.urgent ? "red" : "inherit"
                                    }}>
                                        {categoryEmoji} {task.title}
                                    </h3>
                                    <p>Échéance : {task.date_echeance}</p>
                                    <p>Statut : {task.etat}</p>
                                    <p>Description : {task.description}</p>
                                    <p>Catégorie : {categoryEmoji} {categoryName}</p>
                                    <button onClick={() => {
                                        setEditTaskId(task.id);
                                        setEditTask(task);
                                    }}>Modifier</button>
                                    <button onClick={() => onDelete(task.id)}>Supprimer</button>
                                </>
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}