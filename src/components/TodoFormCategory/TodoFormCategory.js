import { useState } from "react";

const TodoFormCategory = ({ onAddCategory }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [actif, setActif] = useState(false);
    const [showFormCategory, setShowFormCategory] = useState(false);

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (title.trim().length <= 3) alert("Le titre de la catégorie doit être d'au moins 3 caractères.");

        const newCategory = {
            id: Date.now(),
            title,
            description,
            color,
            actif,
        };

        onAddCategory(newCategory);
        setTitle("");
        setDescription("");
        setColor("");
        setActif(false);
        setShowFormCategory(false);
    };

    return (
        <div>
            <button onClick={() => setShowFormCategory(!showFormCategory)}>
                {showFormCategory ? "Masquer le formulaire" : "Ajouter une catégorie"}
            </button>

            {showFormCategory && (
                <form onSubmit={handleAddCategory}>
                    {}
                    <input
                        type="text"
                        placeholder="Ajouter une catégorie..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    required={true}/>

                    {}
                    <input
                        type="color"
                        id="couleur"
                        name="Couleur"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />

                    <button type="submit">Valider</button>
                </form>
            )}
        </div>
    );
};

export default TodoFormCategory;
