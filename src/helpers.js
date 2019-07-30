import React from 'react';
import Spinner from './components/Spinner';

// function to format timestamps from api response

export const formatTimestamp = (timestamp, short = false) => {
    if (short) {
        const options = {
            hour: "2-digit", minute: "2-digit"
        };
        return new Date(timestamp * 1000).toLocaleTimeString(navigator.language, options);
    } else {
        const options = {
            year: "numeric", month: "2-digit",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        return new Date(timestamp * 1000).toLocaleDateString(navigator.language, options);
    }
}

// function to return wind force description based on wind speed

export const windForceName = windSpeed => {
    if (windSpeed < 0.3) {
        return 'Calm';
    } else if (windSpeed < 1.5) {
        return 'Light air';
    } else if (windSpeed < 3.3) {
        return 'Light breeze';
    } else if (windSpeed < 5.4) {
        return 'Gentle breeze';
    } else if (windSpeed < 7.9) {
        return 'Moderate breeze';
    } else if (windSpeed < 10.7) {
        return 'Fresh breeze';
    } else if (windSpeed < 13.8) {
        return 'Strong breeze';
    } else if (windSpeed < 17.1) {
        return 'Near gale';
    } else if (windSpeed < 20.7) {
        return 'Gale';
    } else if (windSpeed < 24.4) {
        return 'Strong gale';
    } else if (windSpeed < 28.4) {
        return 'Storm';
    } else if (windSpeed < 32.6) {
        return 'Violent storm';
    } else if (windSpeed >= 32.6) {
        return 'Hurricane';
    }
}

// function to convert kelvins to celcius degrees

export const kelvinToCelcius = kelvin => {
    return Math.ceil(parseInt(kelvin - 273.15));
}

// function to calculate wind compass direction from degree

export const windDegreeToName = deg => {
    const val = Math.floor((deg / 22.5) + 0.5);
    const arr = ["North", "North-northeast", "North-east", "East-northeast", "East", "East-southeast", "South-east", "South-southeast", "South", "South-southwest", "South-west", "West-southwest", "West", "West-northwest", "North-west", "North-northwest"];
    return arr[(val % 16)];
}

// function to check geolocation support and fire appropriate success or error callbacks (actions)

export const checkGeolocation = (sucessFunction, errorFunction, type, city = false) => {
    if (city) {
        sucessFunction(type, city, true);
    }
    else {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                sucessFunction(type, [position.coords.latitude, position.coords.longitude]);
                // geolocation present but denied
            }, error => {
                errorFunction(error);
            });
            // geolocation not supported
        } else {
            errorFunction(new Error('GeoLocation is not supported in this browser.'));
        }
    }
}

// function which checks data and error objects and displays appropriate elements

export const checkAvailableData = (error, object) => {
    let data = false;
    // if we got ourselves some tasty errors, show message, but omit 404 "city not found" to handle it separately
    if (error && !error.response) {
        data = <div className="backdrop"><p className="error">{error.message}</p></div>;
        // if no data loaded yet show spinner
    } else if (Object.entries(object).length === 0) {
        data = <div className="backdrop"><Spinner /></div>;
    }
    return data;
}

