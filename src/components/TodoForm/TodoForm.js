import { useState } from "react";

const TodoForm = ({ onAddTask, categories }) => {
    const [title, setTitle] = useState("");
    const [date_echeance, setDate_echeance] = useState("");
    const [description, setDescription] = useState("");
    const [etat, setEtat] = useState("Nouveau");
    const [done, setDone] = useState(false);
    const [urgent, setUrgent] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [category, setCategory] = useState("");

    const handleAddTask = (e) => {
        e.preventDefault();
        if (title.trim().length < 3) {
            alert("Le titre de la tâche doit être d'au moins 3 caractères.");
            return;
        }

        const newTask = {
            id: Date.now(),
            title,
            date_echeance,
            description,
            etat,
            done,
            urgent,
            category: category,
            date_creation: new Date().toISOString().split('T')[0]
        }

        onAddTask(newTask);
        setTitle("");
        setDate_echeance("");
        setDescription("");
        setEtat("Nouveau");
        setDone(false);
        setUrgent(false);
        setCategory("");
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
                    <div>
                        <label htmlFor="title">Titre:</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Ajouter une tâche..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required={true}
                        />
                    </div>

                    <div>
                        <label htmlFor="date_echeance">Date d'échéance:</label>
                        <input
                            id="date_echeance"
                            type="date"
                            value={date_echeance}
                            onChange={(e) => setDate_echeance(e.target.value)}
                            required={true}
                        />
                    </div>

                    <div>
                        <label htmlFor="etat">État:</label>
                        <select id="etat" value={etat} onChange={(e) => setEtat(e.target.value)}>
                            <option value="Nouveau">Nouveau</option>
                            <option value="En cours">En Cours</option>
                            <option value="Reussi">Réussi</option>
                            <option value="En attente">En attente</option>
                            <option value="Abandonné">Abandonné</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            placeholder="Description (optionnel)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="category">Catégorie:</label>
                        <select
                            id="category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Aucune catégorie</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.emoji || "📝"} {cat.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>
                            Urgent ?
                            <input
                                type="checkbox"
                                checked={urgent}
                                onChange={(e) => setUrgent(e.target.checked)}
                            />
                        </label>
                    </div>

                    <button type="submit">Valider</button>
                </form>
            )}
        </div>
    );
};

export default TodoForm;