import { debounce, mean } from "lodash";
import { getGeocodeDataFromPostalCode } from "modules/geocode";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setIsLoading, setToaster } from "store/slices/ui/slice";

export type LocationData = {
    latitude: number;
    longitude: number;
    zoom: number;
};

const PostalCodeFinder = () => {
    const dispatch = useDispatch();
    const postalCodeFinderInputRef = useRef<HTMLInputElement>(null);

    const handlePostalCodeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const postalCode = event.target.value;
        if (!postalCode || postalCode.length != 5) return;

        dispatch(setIsLoading(true));
        getGeocodeDataFromPostalCode(postalCode)
            .then((geocodeData) => {
                if (!geocodeData || geocodeData.length === 0) {
                    dispatch(
                        setToaster({
                            message: "Code postal invalide",
                            type: "error",
                        })
                    );
                    return;
                }
                postalCodeFinderInputRef.current?.blur();
                const latitude = mean(geocodeData.map((data) => data.latitude));
                const longitude = mean(
                    geocodeData.map((data) => data.longitude)
                );
                const locationData = {
                    latitude,
                    longitude,
                    zoom: 10,
                };
                window.dispatchEvent(
                    new CustomEvent<LocationData>("flyTo", {
                        detail: locationData,
                    })
                );
            })
            .finally(() => {
                dispatch(setIsLoading(false));
            });
    };

    return (
        <input
            ref={postalCodeFinderInputRef}
            type="number"
            name="postalCode"
            id="postalCodeFinder"
            placeholder="Code postal"
            className="rounded-lg border border-gray-300  p-1.5 focus:border-cta focus:ring-cta"
            onChange={debounce(handlePostalCodeChange, 300)}
        />
    );
};

export default PostalCodeFinder;
