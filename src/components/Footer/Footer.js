import './Footer.css';
import { useState } from "react";

export default function Footer({ addTask }) {
    const [newTask, setNewTask] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [showFormCategory, setShowFormCategory] = useState(false);

    const handleAddTask = (e) => {
        e.preventDefault();
        addTask(newTask); 
        setNewTask("");
        setShowForm(false);
        setNewCategory("");
        setShowFormCategory(false);
    };

    return (
        <>
            <hr />
            <footer>
                {showForm && (
                    <form onSubmit={handleAddTask}>
                        <input
                            type="text"
                            placeholder="Ajouter une tâche..."
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <button type="submit">Valider</button>
                    </form>
                )}
                {showFormCategory && (
                    <form onSubmit={handleAddTask}>
                        <input
                            type="text"
                            placeholder="Ajouter une catégorie..."
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <button type="submit">Valider</button>
                    </form>
                )}

                <h1>Ajouter</h1>
                <div className="button-container">
                    <button onClick={() => setShowForm(!showForm)} className="btn">Tâche</button>
                    <button onClick={()=> setShowFormCategory(!showForm)} className="btn">Catégorie</button>
                </div>
            </footer>
        </>
    );
}
