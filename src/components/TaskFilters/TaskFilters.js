import React from "react";
import styles from './TaskFilters.module.css';

const TaskFilters = ({ categories, filters, onFilterChange }) => {
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        onFilterChange({
            [name]: type === "checkbox" ? checked : value
        });
    };

    const states = ["Nouveau", "En cours", "Reussi", "Réussi", "En attente", "Abandonné"];

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Filtres</h3>

            <div className={styles.filterGroup}>
                <div className={styles.filterItem}>
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

                <div className={styles.filterItem}>
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

                <div className={styles.filterItem}>
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

            <div className={styles.checkboxGroup}>
                <div className={styles.checkboxItem}>
                    <input
                        type="checkbox"
                        name="showUrgent"
                        checked={filters.showUrgent}
                        onChange={handleInputChange}
                    />
                    <label>Tâches urgentes uniquement</label>
                </div>

                <div>
                    <div className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            name="showDone"
                            checked={filters.showDone}
                            onChange={handleInputChange}
                        />
                        <label>Tâches terminées</label>
                    </div>

                    <div className={styles.checkboxItem}>
                        <input
                            type="checkbox"
                            name="showNotDone"
                            checked={filters.showNotDone}
                            onChange={handleInputChange}
                        />
                        <label>Tâches non terminées</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskFilters;