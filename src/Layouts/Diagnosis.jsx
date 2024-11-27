import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Styles from "../styles/Diagnosis.module.css";
import Modal from "../modals/Modal";
import diseaseData from "../data/diseaseData.json";

const Diagnosis = () => {
    const location = useLocation();
    const { diagnosis } = location.state || {};
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDisease, setSelectedDisease] = useState(null);

    if (!diagnosis) {
        return <p>No diagnosis data available</p>;
    }

    const results = diagnosis.results;
    const sortedResults = results.sort((a, b) => b.reliability_percentage - a.reliability_percentage);

    // Dividir los resultados en confiables y no confiables
    const reliableResults = sortedResults.filter(item => item.is_reliable);
    const unreliableResults = sortedResults.filter(item => !item.is_reliable);

    const handleOpenModal = (diseaseName) => {
        const diseaseInfo = diseaseData.find(d => d.disease === diseaseName);
        setSelectedDisease(diseaseInfo);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedDisease(null);
    };

    return (
        <div>
            <h1>Diagnosis</h1>
            <div>
                <div>
                    <h2>Resultados Confiables</h2>
                    {reliableResults.length > 0 ? (
                        <table className={Styles.table}>
                            <thead>
                                <tr>
                                    <th>Enfermedad</th>
                                    <th>Confiabilidad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reliableResults.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.disease}</td>
                                        <td>{item.reliability_percentage}%</td>
                                        <td>
                                            <button onClick={() => handleOpenModal(item.disease)}>Información</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay resultados confiables</p>
                    )}
                </div>
                <div>
                    <h2>Resultados No Confiables</h2>
                    {unreliableResults.length > 0 ? (
                        <table className={Styles.table}>
                            <thead>
                                <tr>
                                    <th>Enfermedad</th>
                                    <th>Confiabilidad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {unreliableResults.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.disease}</td>
                                        <td>{item.reliability_percentage}%</td>
                                        <td>
                                            <button onClick={() => handleOpenModal(item.disease)}>Información</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay resultados no confiables</p>
                    )}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {selectedDisease && (
                    <div>
                        <h2>{selectedDisease.disease}</h2>
                        <img src={selectedDisease.image} alt={selectedDisease.disease} style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }} />
                        <p><strong>Origen:</strong> {selectedDisease.origin}</p>
                        <p><strong>Tratamiento:</strong> {selectedDisease.treatment}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Diagnosis;
