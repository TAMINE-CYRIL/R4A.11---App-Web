import React, { useState } from "react";
import CategoryEmojiPicker from "../EmojiPicker/EmojiPicker";
import styles from './TodoCategory.module.css';

export default function TodoCategory({ categories, onEdit, onDelete }) {
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategory, setEditCategory] = useState({});

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

    const handleEditSave = () => {
        onEdit(editCategoryId, editCategory);
        setEditCategoryId(null);
    };

    return (
        <section>
            <ul className={styles.list}>
                {categories.map((category) => (
                    <li key={category.id} className={styles.listItem}>
                        {editCategoryId === category.id ? (
                            <form>
                                <label htmlFor="title">Titre</label>

                                <input
                                    type="text"
                                    name="title"
                                    value={editCategory.title}
                                    onChange={handleEditChange}
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
                                <div className={styles.categoryActions}>
                                    <button
                                        className={styles.editButton}
                                        onClick={handleEditSave}
                                    >
                                        Sauvegarder
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => setEditCategoryId(null)}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <h3 className={styles.categoryTitle}>
                                    {category.emoji || "📝"} {category.title}
                                </h3>
                                <p className={styles.categoryDescription}>
                                    Description : {category.description}
                                </p>
                                <div className={styles.categoryActions}>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => {
                                            setEditCategoryId(category.id);
                                            setEditCategory({...category, emoji: category.emoji || "📝"});
                                        }}
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
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}