/**
 * Composant contenant le Header de la page
 * @returns {JSX.Element}
 * @constructor
 */
export default function Header({taskCount}) {


    return (
        <>
            <h1>{taskCount} Tâches</h1>
            <hr />
        </>
    );
}
