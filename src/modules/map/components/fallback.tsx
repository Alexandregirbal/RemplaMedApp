const GeolocationFallback = () => {
    return (
        <div className="relative top-0 left-0 px-2 text-tertiary">
            {
                "La géolocalisation n'est pas disponible. Activez la, puis rafraîchissez la page pour une meilleure expérience."
            }
        </div>
    );
};

export default GeolocationFallback;
