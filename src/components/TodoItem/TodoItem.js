export default function TodoItem({tache}) {
    const etatOptions = [
        { value: '', label: '--Choisissez une option--' },
        { value: 'nouveau', label: 'Nouveau' },
        { value: 'encours', label: 'En cours' },
        { value: 'reussi', label: 'Réussi' },
        { value: 'attente', label: 'En attente' },
        { value: 'abandonne', label: 'Abandonné' },
    ];

    return (
        <li> {tache.text}
            <select name="etat" id="etat">
                {etatOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </li>
    );
}
