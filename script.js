function getWeather() {
    let cityName = document.getElementById('cityInput').value.trim();

    // Split city and state/country
    const [city, stateOrCountry] = cityName.split(',').map(part => part.trim());

    // If state is provided, assume US
    let query;
    if (stateOrCountry) {
        if (stateOrCountry.length === 2) {
            query = `${city},${stateOrCountry},US`;
        } else {
            query = `${city},${stateOrCountry}`;
        }
    } else {
        query = city;
    }

    const encodedQuery = encodeURIComponent(query);
    const apiKey = '80c2b8f34394e2e05075f249d9549f58'; // API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedQuery}&appid=${apiKey}&units=imperial`;

    console.log('Fetching weather data for:', cityName);
    console.log('Encoded Query:', encodedQuery);
    console.log('API URL:', url);

    fetch(url)
        .then(response => {
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);

            if (data.cod !== 200) {
                throw new Error(`API error! code: ${data.cod}, message: ${data.message}`);
            }

            const weatherData = {
                location: data.name,
                temperature: data.main.temp,
                description: data.weather[0].description
            };

            document.getElementById('weatherData').textContent = `Location: ${weatherData.location}, Temperature: ${weatherData.temperature}°F, Description: ${weatherData.description}`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data.');
        });
}












