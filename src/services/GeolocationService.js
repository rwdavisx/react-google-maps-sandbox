export const GeolocationService = fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAhbfaGoZAGIPPdafctVnLPPHTuJteGKos',
    {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: {},
    }).then(response => response.json());