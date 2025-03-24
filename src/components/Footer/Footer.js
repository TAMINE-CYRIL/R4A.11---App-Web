import React from 'react';
import style from './Footer.module.css';


const Footer = ({ view, onToggleView }) => {
    return (

        <footer>

            <button
                onClick={onToggleView}
            >
                {view === "taches" ? "Voir les catégories" : "Voir les tâches"}
            </button>
        </footer>
    );
};

export default Footer;