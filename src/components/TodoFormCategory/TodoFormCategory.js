import { useState } from "react";
import CategoryEmojiPicker from "../EmojiPicker/EmojiPicker";

const TodoFormCategory = ({ onAddCategory }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#3498db");
    const [emoji, setEmoji] = useState("📝");
    const [actif, setActif] = useState(false);
    const [showFormCategory, setShowFormCategory] = useState(false);

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (title.trim().length <= 3) {
            alert("Le titre de la catégorie doit être d'au moins 3 caractères.");
            return;
        }

        const newCategory = {
            id: Date.now(),
            title,
            description,
            color,
            emoji,
            actif,
        };

        onAddCategory(newCategory);
        setTitle("");
        setDescription("");
        setColor("#3498db");
        setEmoji("📝");
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
                    <input
                        type="text"
                        placeholder="Ajouter une catégorie..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required={true}
                    />
                    <textarea
                        placeholder="Description (optionnel)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <label htmlFor="couleur">Couleur:</label>
                        <input
                            type="color"
                            id="couleur"
                            name="Couleur"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>

                    <CategoryEmojiPicker
                        selectedEmoji={emoji}
                        onSelectEmoji={setEmoji}
                    />

                    <button type="submit" style={{ marginTop: "15px" }}>Valider</button>
                </form>
            )}
        </div>
    );
};

export default TodoFormCategory;