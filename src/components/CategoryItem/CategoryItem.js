import React from "react";

export default function CategoryItem({ categories }) {
    return (
        <ul>
            {categories.map((categorie) => (
                <li key={categorie.id}>{categorie.text}

                </li>

            ))}

        </ul>
    );
}
