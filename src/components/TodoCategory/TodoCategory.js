import React from "react";

export default function TodoCategory({ categories }) {
    return (
        <ul>
            {categories.map((category) => (
                <li key={category.id}>{category.text}</li>

            ))}

        </ul>
    );
}
