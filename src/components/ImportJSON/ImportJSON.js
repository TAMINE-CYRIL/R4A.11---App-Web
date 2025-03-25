import React, { useState } from 'react';

const ImportJSON = ({ onImport }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleImport = () => {
        if (!selectedFile) {
            alert('Veuillez sélectionner un fichier JSON');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
                const jsonData = JSON.parse(e.target.result);
                if (jsonData.taches && jsonData.categories && jsonData.relations) {
                    onImport({
                        tasks: jsonData.taches,
                        categories: jsonData.categories,
                        relations: jsonData.relations
                    });
                } else {
                    alert('Le fichier JSON ne contient pas la structure attendue');
                }

        };

        reader.readAsText(selectedFile);
    };

    const handleStartFromScratch = () => {
        onImport({
            tasks: [],
            categories: [],
            relations: []
        });
    };

    return (
        <section>
            <h2>Importer des données</h2>

            <div>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileSelect}
                />

            </div>

            <div>
                <button
                    onClick={handleStartFromScratch}
                >
                    Partir de zéro
                </button>
                <button
                    onClick={handleImport}
                >
                    Importer depuis un JSON
                </button>
            </div>

            {selectedFile && (
                <p>Fichier sélectionné : {selectedFile.name}</p>
            )}
        </section>
    );
};

export default ImportJSON;