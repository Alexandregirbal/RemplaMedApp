import Map, { Marker, type ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";

const MapComponent = () => {
    const [viewport, setViewport] = useState<ViewState>({
        latitude: 43, // Somewhere in France
        longitude: 3, // Somewhere in France
        zoom: 5,
        bearing: 0,
        pitch: 0,
        padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setViewport({
                ...viewport,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                zoom: 10,
            });
        });
    }, []);

    return (
        <Map
            mapboxAccessToken="pk.eyJ1IjoiYWxleGFuZHJlZ2lyYmFsIiwiYSI6ImNsaHc2cHBmNjBndDkzZXF3dGM2ODh1c3YifQ.AhMdlbtUvHC2ucOOwRwsYw"
            initialViewState={viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            viewState={{ ...viewport, width: 100, height: 100 }}
        >
            <Marker
                longitude={viewport.longitude}
                latitude={viewport.latitude}
            />
        </Map>
    );
};

export default MapComponent;
