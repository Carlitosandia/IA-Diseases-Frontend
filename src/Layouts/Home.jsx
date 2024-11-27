import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../styles/Home.module.css";
import AxiosInstance from "../config/axios";

const Home = () => {
    const symptoms = [
        "Dificultad para respirar",
        "Tos seca",
        "Tos con flema",
        "Dolor en el pecho",
        "Sibilancias",
        "Fiebre",
        "Congestión nasal",
        "Dolor de garganta",
        "Fatiga",
        "Sudoración nocturna",
        "Escalofríos",
        "Pérdida del apetito",
        "Dolor de cabeza",
        "Náuseas",
        "Dolor muscular",
    ];

    const navigate = useNavigate();
    // Estado inicial para los valores de los sliders
    const [symptomValues, setSymptomValues] = useState(
        symptoms.reduce((acc, symptom) => {
            acc[symptom] = 0; // Los sliders inician en 0
            return acc;
        }, {})
    );

    // Actualizar el estado al cambiar un slider
    const handleChange = (symptom, value) => {
        setSymptomValues((prev) => ({
            ...prev,
            [symptom]: value, // Guardamos el valor directamente (de 0 a 10)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Normalizamos los valores al enviar (0-10 -> 0-0.9)
        const normalizedValues = symptoms.reduce((acc, symptom) => {
            acc[symptom] = parseFloat(((symptomValues[symptom] / 10) * 0.9).toFixed(2));
            return acc;
        }, {});

        try {
            const response = await AxiosInstance.post("/diagnose", normalizedValues);
            navigate("/diagnosis", { state: { diagnosis: response.data } });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Diagnostica tu enfermedad!</h1>
            <p>Cuéntanos cómo te sientes seleccionando la intensidad de tus síntomas:</p>
            <span className={Styles.bold}>Si no tienes el sintoma dejalo como 0, si lo siente muy intenso marca el 10</span>
            <form onSubmit={handleSubmit}>
                {symptoms.map((symptom) => (
                    <div className={Styles.symptomscontainer} key={symptom}>
                        <label>{symptom}</label>
                        <span>{symptomValues[symptom]}</span>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="1"
                            value={symptomValues[symptom]} // Controlamos el slider con el estado
                            onChange={(e) => handleChange(symptom, parseInt(e.target.value))} // Actualizamos directamente
                        />
                    </div>
                ))}
                <button type="submit">Diagnosticar</button>
            </form>
        </div>
    );
};

export default Home;
