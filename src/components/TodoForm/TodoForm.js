import { useState } from "react";

const TodoForm = ({ onAddTask }) => {
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Nouveau");
    const [done, setDone] = useState(false);
    const [urgent, setUrgent] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (title.trim().length < 3) {
            alert("Le titre de la tâche doit être d'au moins 3 caractères");
            return;
        }

        const newTask = {
            id : Date.now(),
            title,
            dueDate,
            description,
            status,
            done,
            urgent,
            creation: new Date().getTime()



        }

        onAddTask(newTask);
        setTitle("");
        setDueDate("");
        setDescription("");
        setStatus("Nouveau");
        setDone(false);
        setUrgent(false);
        setShowForm(false);

    };

    return (
        <div>
            <h2>To-Do List</h2>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Masquer le formulaire" : "Ajouter une tâche"}
            </button>

            {showForm && (
                <form onSubmit={handleAddTask}>
                    <input
                        type="text"
                        placeholder="Ajouter une tâche..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />

                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Nouveau">Nouveau</option>
                        <option value="En cours">En Cours</option>
                        <option value="Reussi">Réussi</option>
                        <option value="Attente">En attente</option>
                        <option value="Abandonné">Abandonné</option>
                    </select>

                    <textarea
                        placeholder="Description (optionnel)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <label>
                        Urgent ?
                        <input
                            type="checkbox"
                            checked={urgent}
                            onChange={(e) => setUrgent(e.target.checked)}
                        />
                    </label>

                    <button type="submit">Valider</button>
                </form>
            )}
        </div>
    );
};

export default TodoForm;
