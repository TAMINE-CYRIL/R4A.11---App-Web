import React, { useState } from "react";

export default function TodoItem({ tasks, categories, relations, onDelete, onEdit, getCategoryForTask }) {
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTask, setEditTask] = useState({});

    const getCategoryName = (taskId) => {
        const category = getCategoryForTask(taskId); // Use the function passed from App.js
        return category ? category.title : 'Aucune catégorie';
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditTask((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditSave = () => {
        onEdit(editTaskId, editTask);
        setEditTaskId(null);
    };

    return (
        <section>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {editTaskId === task.id ? (
                            <>
                                <input type="text" name="title" value={editTask.title} onChange={handleEditChange} />
                                <input type="date" name="date_echeance" value={editTask.date_echeance} onChange={handleEditChange} />
                                <select name="etat" value={editTask.etat} onChange={handleEditChange}>
                                    <option value="Nouveau">Nouveau</option>
                                    <option value="En cours">En cours</option>
                                    <option value="Réussi">Réussi</option>
                                    <option value="En attente">En attente</option>
                                    <option value="Abandonné">Abandonné</option>
                                </select>
                                <textarea
                                    name="description"
                                    placeholder="Description (optionnel)"
                                    value={editTask.description}
                                    onChange={handleEditChange}
                                />
                                <button onClick={handleEditSave}>Sauvegarder</button>
                                <button onClick={() => setEditTaskId(null)}>Annuler</button>
                            </>
                        ) : (
                            <>
                                <h3>{task.title}</h3>
                                <p>Échéance : {task.date_echeance}</p>
                                <p>Statut : {task.etat}</p>
                                <p>Description : {task.description}</p>
                                {task.urgent && <p style={{ color: "red" }}>Urgent</p>}
                                <p>Catégorie : {getCategoryName(task.id)}</p>
                                <button onClick={() => { setEditTaskId(task.id); setEditTask(task); }}>Modifier</button>
                                <button onClick={() => onDelete(task.id)}>Supprimer</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
