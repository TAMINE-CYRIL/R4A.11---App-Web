import { useState } from "react";

const TodoForm = ({ onAddTask }) => {
    const [title, setTitle] = useState("");
    const [date_echeance, setDate_echeance] = useState("");
    const [description, setDescription] = useState("");
    const [etat, setEtat] = useState("Nouveau");
    const [done, setDone] = useState(false);
    const [urgent, setUrgent] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (title.trim().length <= 3) {
            alert("Le titre de la tâche doit être d'au moins 3 caractères.");
            return;
        }

        const newTask = {
            id : Date.now(),
            title,
            date_echeance,
            description,
            etat,
            done,
            urgent,
            date_creation: new Date().getTime()



        }

        onAddTask(newTask);
        setTitle("");
        setDate_echeance("");
        setDescription("");
        setEtat("Nouveau");
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
                    required={true}/>
                    <input
                        type="date"
                        value={date_echeance}
                        onChange={(e) => setDate_echeance(e.target.value)}
                    required={true}/>

                    <select value={etat} onChange={(e) => setEtat(e.target.value)}>
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
