import { useState } from "react";
import style from "../styles/Pagination.module.css";

export default function Pagination({ filteredPage, handleFilteredPageChange, numFilteredPages }) {
    const [pageInput, setPageInput] = useState(""); // Stato per l'input della pagina
    const [showInput, setShowInput] = useState(false); // Stato per mostrare/nascondere l'input

    function scrollFiltered() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Funzione per generare i numeri di pagina in base alla logica richiesta
    const getPageNumbers = () => {
        let pages = [];

        if (numFilteredPages <= 3) {
            // Se il numero di pagine è 3 o inferiore, mostra tutte le pagine
            for (let i = 1; i <= numFilteredPages; i++) {
                pages.push(i);
            }
        } else {
            if (filteredPage === 1) {
                pages = [1, 2, 3, '...', numFilteredPages];
            } else if (filteredPage === 2) {
                pages = [1, 2, 3, '...', numFilteredPages];
            } else if (filteredPage === numFilteredPages - 1) {
                pages = [1, '...', numFilteredPages - 2, numFilteredPages - 1, numFilteredPages];
            } else if (filteredPage === numFilteredPages) {
                pages = [1, '...', numFilteredPages - 2, numFilteredPages - 1, numFilteredPages];
            } else if (filteredPage >= 3 && filteredPage < numFilteredPages - 1) {
                pages = [1, '...', filteredPage - 1, filteredPage, filteredPage + 1, '...', numFilteredPages];
            }
        }

        return pages;
    };

    // Funzione per gestire l'input dell'utente
    const handlePageInputChange = (e) => {
        const value = e.target.value;
        if (value === "" || /^[1-9][0-9]*$/.test(value)) {
            setPageInput(value); // Aggiorniamo lo stato solo se il valore è un numero positivo
        }
    };

    const handlePageInputBlur = () => {
        if (pageInput && Number(pageInput) >= 1 && Number(pageInput) <= numFilteredPages) {
            handleFilteredPageChange(Number(pageInput));
        }
        setShowInput(false); // Nascondiamo l'input quando perde il focus
    };

    const handlePageInputKeyDown = (e) => {
        if (e.key === "Enter" && pageInput) {
            if (Number(pageInput) >= 1 && Number(pageInput) <= numFilteredPages) {
                handleFilteredPageChange(Number(pageInput)); // Cambia pagina se l'input è valido
            }
            setShowInput(false); // Nascondiamo l'input al "Enter"
        }
    };

    return (
        <nav className="col-12 d-flex justify-content-center mt-5">
            <ul className="pagination">
                {/* Pulsante per andare alla pagina precedente */}
                <li className={`page-item ${filteredPage <= 1 ? "disabled" : ""} px-5 d-none d-md-block`}>
                    <button
                        className={`page-link ${style.pageBtn}`}
                        onClick={() => { handleFilteredPageChange(filteredPage - 1); scrollFiltered(); }}
                    >
                        Previous
                    </button>
                </li>

                {/* Mostra i numeri di pagina */}
                {getPageNumbers().map((num, index) => (
                    <li
                        className={`page-item ${num === filteredPage ? "" : `${style.dark}`} mx-2`}
                        aria-current="page"
                        key={index}
                    >
                        {/* Se è '...', non è cliccabile e fa apparire l'input */}
                        {num === '...' ? (
                            <button
                                className={`page-link ${style.pageBtn}`}
                                onClick={() => setShowInput(true)} // Mostra l'input quando clicchi su "..."
                            >
                                ...
                            </button>
                        ) : (
                            <button
                                className={`page-link ${num === filteredPage ? `${style.active}` : `${style.dark}`} ${style.pageBtn}`}
                                onClick={() => { handleFilteredPageChange(num); scrollFiltered(); }}
                            > {num}
                            </button>
                        )}
                    </li>
                ))}

                {/* Se l'input è visibile, mostra il campo per inserire il numero della pagina */}
                {showInput && (
                    <li className="page-item mx-2">
                        <input
                            type="number"
                            className={`page-link ${style.pageBtn}`}
                            value={pageInput}
                            onChange={handlePageInputChange}
                            onBlur={handlePageInputBlur}
                            onKeyDown={handlePageInputKeyDown}
                            placeholder="Page"
                            min={1}
                            max={numFilteredPages}
                            autoFocus
                        />
                    </li>
                )}

                {/* Pulsante per andare alla pagina successiva */}
                <li className={`page-item ${filteredPage >= numFilteredPages ? "disabled" : ""} px-5 d-none d-md-block`}>
                    <button
                        className={`page-link ${style.pageBtn}`}
                        onClick={() => { handleFilteredPageChange(filteredPage + 1); scrollFiltered(); }}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}