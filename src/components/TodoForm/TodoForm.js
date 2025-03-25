import { useState } from "react";
import styles from './TodoForm.module.css';

const TodoForm = ({ onAddTask, categories }) => {
    const [title, setTitle] = useState("");
    const [date_echeance, setDate_echeance] = useState("");
    const [description, setDescription] = useState("");
    const [etat, setEtat] = useState("Nouveau");
    const [done, setDone] = useState(false);
    const [urgent, setUrgent] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
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
        setShowPopup(false);
    };

    return (
        <div className={styles.container}>
            <button
                className={styles.toggleButton}
                onClick={() => setShowPopup(true)}
            >
                Ajouter une tâche
            </button>

            {showPopup && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popupContent}>
                        <button
                            className={styles.closeButton}
                            onClick={() => setShowPopup(false)}
                        >
                            ×
                        </button>
                        <form onSubmit={handleAddTask} className={styles.form}>
                            <h3>Nouvelle Tâche</h3>
                            <div className={styles.formGroup}>
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

                            <div className={styles.formGroup}>
                                <label htmlFor="date_echeance">Date d'échéance:</label>
                                <input
                                    id="date_echeance"
                                    type="date"
                                    value={date_echeance}
                                    onChange={(e) => setDate_echeance(e.target.value)}
                                    required={true}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="etat">État:</label>
                                <select id="etat" value={etat} onChange={(e) => setEtat(e.target.value)}>
                                    <option value="Nouveau">Nouveau</option>
                                    <option value="En cours">En Cours</option>
                                    <option value="Reussi">Reussi</option>
                                    <option value="En attente">En attente</option>
                                    <option value="Abandonné">Abandonné</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    id="description"
                                    placeholder="Description (optionnel)"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className={styles.formGroup}>
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

                            <div className={styles.formGroup}>
                                <label>
                                    Urgent ?
                                    <input
                                        type="checkbox"
                                        checked={urgent}
                                        onChange={(e) => setUrgent(e.target.checked)}
                                    />
                                </label>
                            </div>

                            <button type="submit" className={styles.submitButton}>Valider</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoForm;