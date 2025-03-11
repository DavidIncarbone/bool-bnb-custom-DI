import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Importa lo stile

export default function LoaderCard() {
    return (
        <div className="card-skeleton container">
            <div className="row g-4"> 
                {/* Colonna sinistra con immagine */}
                <div className="col-12 col-md-6 col-lg-4">
                    <Skeleton height="100%" width="100%" baseColor="#EADAA2" highlightColor="#C6A664" />
                </div>
                
                {/* Colonna destra con testo */}
                <div className="col-12 col-md-6 col-lg-8 d-flex flex-column gap-3">
                    <Skeleton height="80%" width="80%" baseColor="#EADAA2" highlightColor="#C6A664" />
                    <Skeleton height="80%" width="60%" baseColor="#EADAA2" highlightColor="#C6A664" />
                    <Skeleton height="80%" width="90%" baseColor="#EADAA2" highlightColor="#C6A664" />
                    <Skeleton height="80%" width="50%" baseColor="#EADAA2" highlightColor="#C6A664" />
                </div>
            </div>
        </div>
    );
}
