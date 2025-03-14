export default function Modal(isOpen, closeModal, children) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
                <button className="close-button" onClick={closeModal}>X</button>
                {children} {/* Affiche le contenu du modal */}
        </div>
    );


}