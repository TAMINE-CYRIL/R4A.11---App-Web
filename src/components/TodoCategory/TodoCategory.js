import React, { useState } from "react";
import CategoryEmojiPicker from "../EmojiPicker/EmojiPicker";
import styles from './TodoCategory.module.css';

export default function TodoCategory({ categories, onEdit, onDelete }) {
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategory, setEditCategory] = useState({});
    const [showPopup, setShowPopup] = useState(false);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditCategory((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEmojiChange = (emoji) => {
        setEditCategory((prev) => ({
            ...prev,
            emoji,
        }));
    };

    const handleEditSave = (e) => {
        e.preventDefault();
        if (editCategory.title.trim().length <= 3) {
            alert("Le titre de la catégorie doit être d'au moins 3 caractères.");
            return;
        }

        onEdit(editCategoryId, editCategory);
        setEditCategoryId(null);
        setShowPopup(false);
    };

    const openEditPopup = (category) => {
        setEditCategoryId(category.id);
        setEditCategory({...category, emoji: category.emoji || "📝"});
        setShowPopup(true);
    };

    const closeEditPopup = () => {
        setEditCategoryId(null);
        setShowPopup(false);
    };

    return (
        <section>
            <ul className={styles.list}>
                {categories.map((category) => (
                    <li key={category.id} className={styles.listItem}>
                        <h3 className={styles.categoryTitle} style={{color:category.color}}>
                            {category.emoji || "📝"} {category.title}
                        </h3>
                        <p className={styles.categoryDescription}>
                            Description : {category.description}
                        </p>
                        <div className={styles.categoryActions}>
                            <button
                                className={styles.editButton}
                                onClick={() => openEditPopup(category)}
                            >
                                Modifier
                            </button>
                            <button
                                className={styles.deleteButton}
                                onClick={() => onDelete(category.id)}
                            >
                                Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {showPopup && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popupContent}>
                        <button
                            className={styles.closeButton}
                            onClick={closeEditPopup}
                        >
                            ×
                        </button>
                        <form onSubmit={handleEditSave}>
                            <h3>Modifier la Catégorie</h3>

                            <label htmlFor="title">Titre</label>
                            <input
                                type="text"
                                name="title"
                                value={editCategory.title}
                                onChange={handleEditChange}
                                required
                            />

                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                placeholder="Description (optionnel)"
                                value={editCategory.description}
                                onChange={handleEditChange}
                            />

                            <label htmlFor="color">Couleur</label>
                            <input
                                type="color"
                                name="color"
                                value={editCategory.color}
                                onChange={handleEditChange}
                            />

                            <label htmlFor="emoji">Emoji</label>
                            <CategoryEmojiPicker
                                selectedEmoji={editCategory.emoji || "📝"}
                                onSelectEmoji={handleEmojiChange}
                            />

                            <button type="submit" className={styles.submitButton}>
                                Sauvegarder
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}