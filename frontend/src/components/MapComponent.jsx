import { useEffect, useRef, useState } from "react";

import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";

export default function MapComponent({ longitude, latitude }) {
    const mapContainerRef = useRef(null); // Riferimento per il contenitore della mappa
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (mapContainerRef.current) {
            const newMap = new maplibregl.Map({
                container: mapContainerRef.current, // ID del contenitore
                // style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json", // Stile della mappa
                style: "https://tiles.openfreemap.org/styles/liberty",
                center: [longitude, latitude], // Posizione iniziale
                zoom: 14, // Livello di zoom
            });

            // Aggiungere un marker alla mappa
            new maplibregl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(newMap);

            setMap(newMap);
        }

        return () => {
            if (map) {
                map.remove(); // Pulizia della mappa quando il componente viene smontato
            }
        };
    }, [longitude, latitude]);

    useEffect(() => {
        if (map) {
            map.setCenter([longitude, latitude]); // Cambia la posizione della mappa quando lon/lat cambiano
        }
    }, [longitude, latitude, map]);

    return (
        <div
            ref={mapContainerRef}
            style={{ width: "100%", height: "250px" }}
        >
            {/* La mappa viene renderizzata all'interno di questo div */}
        </div>
    );
}