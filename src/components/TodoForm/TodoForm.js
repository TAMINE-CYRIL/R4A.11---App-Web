import { useState } from "react";

const TodoForm = ({ onAddTask }) => {
    const [newTask, setNewTask] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTask.trim() === "") return;
        onAddTask(newTask);
        setNewTask("");
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
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button type="submit">Valider</button>
                </form>
            )}
        </div>
    );
};

export default TodoForm;
