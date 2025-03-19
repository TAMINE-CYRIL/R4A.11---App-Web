import { useState } from "react";

const TodoFormCategory = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [showFormCategory , setShowFormCategory] = useState(false);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newCategory.trim() === "") return;

        setCategories([...categories, { id: Date.now(), text: newCategory, completed: false }]);
        setNewCategory("");
        setShowFormCategory(false);
    };

    return (
        <div>
            <h2>To-Do List</h2>
            <button onClick={() => setShowFormCategory(!showFormCategory )}>
                {showFormCategory ? "Masquer le formulaire" : "Ajouter une catégorie"}
            </button>

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

            <ul>
                {categories.map((category) => (
                    <li key={category.id}>{category.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoFormCategory;
