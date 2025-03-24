import React from 'react';
import styles from './EmojiPicker.module.css';

const EmojiPicker = ({selectedEmoji, onSelectEmoji}) => {
    const emojis = [
        "📝", "📌", "📊", "📈", "📱", "💻", "🎨", "🔧",
        "📚", "🏠", "🛒", "💼", "🎯", "⚙️", "✅", "❤️",
        "🔔", "📅", "💡", "📣", "🔍", "📷", "🎬", "💰"
    ];

    return (
        <div className={styles.container}>
            <label className={styles.label}>Choisir un emoji:</label>
            <div className={styles.emojiGrid}>
                {emojis.map((emoji, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`${styles.emojiButton} ${selectedEmoji === emoji ? styles.selected : ""}`}
                        onClick={() => onSelectEmoji(emoji)}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default EmojiPicker;