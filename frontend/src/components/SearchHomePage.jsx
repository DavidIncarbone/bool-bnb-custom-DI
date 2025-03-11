import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom"; // Usa Link come nel tuo codice originale
import styles from '../styles/SearchHomePage.module.css';  // Usa CSS Modules, se preferisci

export default function SearchHomePage() {
    const [temp, setTemp] = useState(""); // Usa una stringa per 'searchParam'
    const isFormEmpty = temp === "" || temp == 0; // Verifica se il campo è vuoto o uguale a 0
    const hasSpecialCharacters = /[^a-zA-Z0-9\s]/.test(temp); // Modificato per permettere spazi

    const clearInput = () => {
        setTemp(""); // Svuota il campo di input
    };

    const formattingSlug = (string) => {
        // Prendi solo la parte prima della virgola
        const cityName = string.split(',')[0];

        return cityName
            .toLowerCase()
            .trim() // Rimuove spazi sia a sinistra che a destra
            .normalize("NFD")
            .replace(/[^\w\s-]/g, '') // Rimuove caratteri non alfanumerici tranne spazi e trattini
            .replace(/[\s_-]+/g, '+') // Sostituisce spazi, trattini e underscore con '+'
            .replace(/^-+|-+$/g, '') // Rimuove trattini iniziali e finali
            .replace(/\.\s/g, '.'); // Mantiene il punto seguito da spazio
    };

    const handleChange = (e) => {
        setTemp(e.target.value); // Aggiorna lo stato con il nuovo valore dell'input
    };

    const handleKeyDown = (event) => {
        // Se il tasto premuto è "Enter" e il campo di input non è vuoto
        if (event.key === 'Enter') {
            event.preventDefault(); // Impediamo il comportamento di submit del form
            const trimmedInput = temp.trim(); // Rimuovi gli spazi solo ai lati
            if (trimmedInput !== "" && !hasSpecialCharacters) {
                // Naviga al link solo se l'input non è vuoto
                window.location.href = `/advanced-research?search=${formattingSlug(trimmedInput)}`;
            }
        }
    };

    useEffect(() => {
        // Aggiungi l'evento di keydown solo se il form è attivo
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [temp]); // Assicurati che temp sia passato correttamente per evitare loop

    return (
        <section style={{ marginTop: "50px" }}>
            <motion.form
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="container m-auto p-4 shadow-lg rounded bg-light"
            >
                <h2 className="mb-4">Search for an accommodation</h2>

                <div className="form-group row mt-3">
                    <label htmlFor="searchParam">Search here city or address</label>
                    <div className={`col-12 col-md-10 d-flex`}>
                        <span className="input-group-text rounded-end-0"><FaSearch /></span>
                        <input
                            type="text"
                            className="form-control w-100 rounded-start-0 rounded-end-0"
                            id="searchParam"
                            name="searchParam"
                            placeholder="Insert city or address"
                            value={temp}
                            onChange={handleChange} // Usa onChange per aggiornare lo stato
                            autoComplete="off"
                        />
                        {/* La X appare solo se c'è qualcosa nell'input */}
                        {temp && (
                            <span
                                className="input-group-text cursor-pointer rounded-start-0"
                                onClick={clearInput}
                            >
                                <FaTimes />
                            </span>
                        )}
                    </div>
                    <div className="col-12 col-md-2 mt-3 mt-md-0">
                        <Link
                            className="btn btn-send w-100 w-md-0"
                            to={temp.trim() !== "" && !hasSpecialCharacters ? `/advanced-research?search=${formattingSlug(temp)}` : "#"}
                            disabled={isFormEmpty}
                            style={{
                                color: isFormEmpty ? '#888' : '',               // Colore grigio se disabilitato
                                backgroundColor: isFormEmpty ? '#C6A664' : '',  // Colore di sfondo più chiaro se disabilitato
                                cursor: isFormEmpty ? 'not-allowed' : '',        // Cambia il cursore a "non consentito"
                                pointerEvents: isFormEmpty ? 'none' : '',        // Disabilita gli eventi del mouse
                                opacity: isFormEmpty ? 0.5 : 1                  // Riduce l'opacità se disabilitato
                            }}
                        >
                            Search
                        </Link>
                    </div>
                </div>

            </motion.form>
        </section>
    );
}
