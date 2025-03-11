import { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import style from "../styles/Pagination.module.css";

export default function PaginationHome({ page, handlePageChange, numPages }) {


    const [pageInput, setPageInput] = useState(""); // Stato per l'input della pagina
    const [showInput, setShowInput] = useState(false); // Stato per mostrare/nascondere l'input

    // Funzione per generare i numeri di pagina in base alla logica richiesta
    const getPageNumbers = () => {
        let pages = [];

        if (numPages <= 3) {
            // Se il numero di pagine è 3 o inferiore, mostra tutte le pagine
            for (let i = 1; i <= numPages; i++) {
                pages.push(i);
            }
        } else {
            if (page === 1) {
                pages = [1, 2, 3, '...', numPages];
            } else if (page === 2) {
                pages = [1, 2, 3, '...', numPages];
            } else if (page === numPages - 1) {
                pages = [1, '...', numPages - 2, numPages - 1, numPages];
            } else if (page === numPages) {
                pages = [1, '...', numPages - 2, numPages - 1, numPages];
            } else if (page >= 3 && page < numPages - 1) {
                pages = [1, '...', page - 1, page, page + 1, '...', numPages];
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
        if (pageInput && Number(pageInput) >= 1 && Number(pageInput) <= numPages) {
            handlePageChange(Number(pageInput));
        }
        setShowInput(false); // Nascondiamo l'input quando perde il focus
    };

    const handlePageInputKeyDown = (e) => {
        if (e.key === "Enter" && pageInput) {
            if (Number(pageInput) >= 1 && Number(pageInput) <= numPages) {
                handlePageChange(Number(pageInput)); // Cambia pagina se l'input è valido
            }
            setShowInput(false); // Nascondiamo l'input al "Enter"
        }
    };

    return (
        <nav className="col-12 d-flex justify-content-center mt-5">
            <ul className="pagination">
                {/* Pulsante per andare alla pagina precedente */}
                <li className={`page-item ${page <= 1 ? "disabled" : ""} px-5`}>
                    <button
                        className={`page-link ${style.pageBtn}`}
                        onClick={() => {
                            handlePageChange(page - 1), window.scrollTo(
                                {
                                    top: 500,
                                    behavior: "smooth"
                                }
                            )
                        }}
                    >
                        Previous
                    </button>
                </li>

                {/* Mostra i numeri di pagina */}
                {getPageNumbers().map((num, index) => (
                    <li
                        className={`page-item ${num === page ? "" : `${style.dark}`} mx-2`}
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
                                className={`page-link ${num === page ? `${style.active}` : `${style.dark}`} ${style.pageBtn}`}
                                onClick={() => {
                                    handlePageChange(num),
                                        window.scrollTo(
                                            {
                                                top: 500,
                                                behavior: "smooth"
                                            }
                                        )
                                }}
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
                            max={numPages}
                            autoFocus
                        />
                    </li>
                )}

                {/* Pulsante per andare alla pagina successiva */}
                <li className={`page-item ${page >= numPages ? "disabled" : ""} px-5`}>
                    <button
                        className={`page-link ${style.pageBtn}`}
                        onClick={() => {
                            handlePageChange(page + 1),
                                window.scrollTo(
                                    {
                                        top: 500,
                                        behavior: "smooth"
                                    }
                                )
                        }}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}
