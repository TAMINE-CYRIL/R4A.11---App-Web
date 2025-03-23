const EmojiPicker = ({selectedEmoji, onSelectEmoji}) => {
    const emojis = [
        "📝", "📌", "📊", "📈", "📱", "💻", "🎨", "🔧",
        "📚", "🏠", "🛒", "💼", "🎯", "⚙️", "✅", "❤️",
        "🔔", "📅", "💡", "📣", "🔍", "📷", "🎬", "💰"
    ];

    return (
        <div className="emoji-picker">
            <label>Choisir un emoji:</label>
                {emojis.map((emoji, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`emoji-btn ${selectedEmoji === emoji ? "selected" : ""}`}
                        onClick={() => onSelectEmoji(emoji)}
                    >
                        {emoji}
                    </button>
                ))}
            </div>



    );
}

export default EmojiPicker;