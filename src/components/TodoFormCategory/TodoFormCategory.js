import React, { useState } from "react";
import CategoryEmojiPicker from "../EmojiPicker/EmojiPicker";
import styles from './TodoFormCategory.module.css';

const TodoFormCategory = ({ onAddCategory }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#3498db");
    const [emoji, setEmoji] = useState("📝");
    const [actif, setActif] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

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
        setShowPopup(false);
    };

    return (
        <div className={styles.container}>
            <button
                className={styles.toggleButton}
                onClick={() => setShowPopup(true)}
            >
                Ajouter une catégorie
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
                        <form onSubmit={handleAddCategory}>
                            <h3>Nouvelle Catégorie</h3>
                            <label htmlFor="title">Titre</label>
                            <input
                                type="text"
                                placeholder="Ajouter une catégorie..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required={true}
                            />

                            <label htmlFor="description">Description</label>
                            <textarea
                                placeholder="Description (optionnel)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <label htmlFor="color">Couleur:</label>
                            <input
                                type="color"
                                id="color"
                                name="Couleur"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />

                            <CategoryEmojiPicker
                                selectedEmoji={emoji}
                                onSelectEmoji={setEmoji}
                            />

                            <button type="submit" className={styles.submitButton}>Valider</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoFormCategory;