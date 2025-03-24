import styles from './Header.module.css';

/**
 * Composant contenant le Header de la page
 * @returns {JSX.Element}
 * @constructor
 */
export default function Header({ taskCount, unfinishedCount }) {
    return (
        <>
            <section className={styles.header}>
                <h1>{taskCount} Tâches</h1>
                <section>
                    <p>
                        Total: {taskCount} | À faire: <span>{unfinishedCount}</span>
                    </p>
                </section>
            </section>
            <hr />
        </>
    );
}