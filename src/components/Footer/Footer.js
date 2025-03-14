import './Footer.css';

/**
 * Composant contenant le Footer de la page
 * @returns {JSX.Element}
 * @constructor
 */
export default function Footer() {
    return (
        <>
            <hr />
            <footer>
                <h1>Ajouter</h1>
                <div className="button-container">
                    <button className="btn">Tâche</button>
                    <button className="btn">Catégorie</button>
                </div>
            </footer>
        </>
    );
}
