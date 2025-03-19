import React, { useState } from "react";

export default function TodoItem({ tasks, onDelete, onEdit }) {
    const [editTaskId, setEditTaskId] = useState(null);
    const [editText, setEditText] = useState("");

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    {editTaskId === task.id ? (
                        <>
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            />
                            <button onClick={() => onEdit(task.id, editText)}>Sauvegarder</button>
                            <button onClick={() => setEditTaskId(null)}>Annuler</button>
                        </>
                    ) : (
                        <>
                            {task.title}

                            {task.status}

                            {task.description}

                            <button onClick={() => { setEditTaskId(task.id); setEditText(task.title); }}>Modifier</button>
                            <button onClick={() => onDelete(task.id)}>Supprimer</button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}


