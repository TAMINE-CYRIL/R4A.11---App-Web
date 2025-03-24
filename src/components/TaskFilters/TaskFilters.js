import React from "react";

const TaskFilters = ({ categories, filters, onFilterChange }) => {
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        onFilterChange({
            [name]: type === "checkbox" ? checked : value
        });
    };

    const states = ["Nouveau", "En cours", "Reussi", "Réussi", "En attente", "Abandonné"];

    return (
        <div className="task-filters">
            <h3>Filtres</h3>

            <div>
                <div>
                    <label htmlFor="searchTerm">Recherche : </label>
                    <input
                        type="text"
                        id="searchTerm"
                        name="searchTerm"
                        value={filters.searchTerm}
                        onChange={handleInputChange}
                        placeholder="Rechercher..."
                    />
                </div>

                <div>
                    <label htmlFor="category">Catégorie : </label>
                    <select
                        id="category"
                        name="category"
                        value={filters.category}
                        onChange={handleInputChange}
                    >
                        <option value="">Toutes les catégories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.emoji || "📝"} {category.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="state">État : </label>
                    <select
                        id="state"
                        name="state"
                        value={filters.state}
                        onChange={handleInputChange}
                    >
                        <option value="">Tous les états</option>
                        {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        name="showUrgent"
                        checked={filters.showUrgent}
                        onChange={handleInputChange}
                    />
                    Tâches urgentes uniquement
                </label>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="showDone"
                            checked={filters.showDone}
                            onChange={handleInputChange}
                        />
                        Tâches terminées
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            name="showNotDone"
                            checked={filters.showNotDone}
                            onChange={handleInputChange}
                        />
                        Tâches non terminées
                    </label>
                </div>
            </div>
        </div>
    );
};

export default TaskFilters;