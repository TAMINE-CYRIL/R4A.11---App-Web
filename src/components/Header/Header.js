/**
 * Composant contenant le Header de la page
 * @returns {JSX.Element}
 * @constructor
 */
export default function Header({ taskCount, unfinishedCount }) {
    return (
        <>
            <div>
                <h1>{taskCount} Tâches</h1>
                <div>
                    <p>
                        Total: {taskCount} | À faire: <span>{unfinishedCount}</span>
                    </p>
                </div>
            </div>
            <hr />
        </>
    );
}