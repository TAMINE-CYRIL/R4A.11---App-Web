import React, { useState } from "react";
import CategoryEmojiPicker from "../EmojiPicker/EmojiPicker";

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
            <ul className="liste">
                {categories.map((category) => (
                    <li key={category.id}>
                        {editCategoryId === category.id ? (
                            <>
                                <input
                                    type="text"
                                    name="title"
                                    value={editCategory.title}
                                    onChange={handleEditChange}
                                />
                                <textarea
                                    name="description"
                                    placeholder="Description (optionnel)"
                                    value={editCategory.description}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="color"
                                    name="color"
                                    value={editCategory.color}
                                    onChange={handleEditChange}
                                />
                                <CategoryEmojiPicker
                                    selectedEmoji={editCategory.emoji || "📝"}
                                    onSelectEmoji={handleEmojiChange}
                                />
                                <button onClick={handleEditSave}>Sauvegarder</button>
                                <button onClick={() => setEditCategoryId(null)}>Annuler</button>
                            </>
                        ) : (
                            <>
                                <h3 style={{ color: category.color }}>
                                    {category.emoji || "📝"} {category.title}
                                </h3>
                                <p>Description : {category.description}</p>
                                <button onClick={() => {
                                    setEditCategoryId(category.id);
                                    setEditCategory({...category, emoji: category.emoji || "📝"});
                                }}>
                                    Modifier
                                </button>
                                <button onClick={() => onDelete(category.id)}>Supprimer</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}