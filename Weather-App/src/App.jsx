import { useState, useEffect } from 'react'
import './App.css'

// You must provide your own OpenWeatherMap API key.
// 1. Sign up at https://openweathermap.org and get an API key.
// 2. Create a file named ".env" in the project root (same level as package.json)
// 3. Add this line to .env (replace YOUR_KEY with the real key):
//    VITE_OPENWEATHER_API_KEY=YOUR_KEY
// 4. Restart the dev server (npm run dev).

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [source, setSource] = useState('') // "city" or "location"

  const fetchWeather = async ({ url, sourceLabel }) => {
    setError('')
    setWeather(null)
    setSource('')

    if (!API_KEY) {
      setError('Missing API key. Set VITE_OPENWEATHER_API_KEY in a .env file.')
      return
    }

    try {
      setLoading(true)

      const res = await fetch(url)

      if (!res.ok) {
        if (res.status === 404) {
          setError('City not found. Please check the spelling and try again.')
        } else {
          setError('Unable to fetch weather data. Please try again later.')
        }
        return
      }

      const data = await res.json()

      // Validate that the response includes temperature data
      if (!data.main || typeof data.main.temp !== 'number') {
        setError('Unexpected response from weather service.')
        return
      }

      setWeather({
        name: data.name,
        country: data.sys?.country,
        temp: data.main.temp, // in Celsius
        feelsLike: data.main.feels_like,
        description: data.weather?.[0]?.description,
        icon: data.weather?.[0]?.icon,
        humidity: data.main.humidity,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        windSpeed: data.wind?.speed,
        pressure: data.main.pressure,
        visibility: typeof data.visibility === 'number' ? data.visibility : null,
        timezone: data.timezone,
      })
      setSource(sourceLabel)
      
      // If weather was fetched from location, update the city input
      if (sourceLabel === 'location') {
        setCity(data.name)
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  // On first load, try using the user's current location as the default
  useEffect(() => {
    if (!navigator.geolocation) {
      // Silent fail: user can still search by city or use the button
      return
    }

    if (!API_KEY) {
      // Show this once so user knows why nothing loads
      setError('Missing API key. Set VITE_OPENWEATHER_API_KEY in a .env file.')
      return
    }

    setLoading(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          const url = `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          const res = await fetch(url)

          if (!res.ok) {
            setError('Unable to fetch weather data. Please try again later.')
            return
          }

          const data = await res.json()

          if (!data.main || typeof data.main.temp !== 'number') {
            setError('Unexpected response from weather service.')
            return
          }

          setWeather({
            name: data.name,
            country: data.sys?.country,
            temp: data.main.temp,
            feelsLike: data.main.feels_like,
            description: data.weather?.[0]?.description,
            icon: data.weather?.[0]?.icon,
            humidity: data.main.humidity,
            tempMin: data.main.temp_min,
            tempMax: data.main.temp_max,
            windSpeed: data.wind?.speed,
            pressure: data.main.pressure,
            visibility:
              typeof data.visibility === 'number' ? data.visibility : null,
            timezone: data.timezone,
          })
          setSource('location')
          setCity(data.name) // Set the city name in the search bar
        } catch {
          setError('Network error. Please check your connection and try again.')
        } finally {
          setLoading(false)
        }
      },
      () => {
        // If user denies or it fails, they can still search manually
        setLoading(false)
      }
    )
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const trimmedCity = city.trim()
    if (!trimmedCity) {
      setError('Please enter a city name.')
      return
    }

    const url = `${API_URL}?q=${encodeURIComponent(
      trimmedCity
    )}&appid=${API_KEY}&units=metric`

    fetchWeather({ url, sourceLabel: 'city' })
  }

  const handleUseLocation = () => {
    setError('')
    setWeather(null)
    setSource('')

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }

    if (!API_KEY) {
      setError('Missing API key. Set VITE_OPENWEATHER_API_KEY in a .env file.')
      return
    }

    setLoading(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const url = `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        fetchWeather({ url, sourceLabel: 'location' })
      },
      (geoError) => {
        if (geoError.code === geoError.PERMISSION_DENIED) {
          setError('Location permission was denied. Please allow access or search by city.')
        } else {
          setError('Unable to get your location. Please search by city instead.')
        }
        setLoading(false)
      }
    )
  }

  return (
    <div className="app">
      <h1 className="title">Weather Checker</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name (e.g. London)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />
        <div className="button-group">
          <button type="submit" className="button primary" disabled={loading}>
            {loading ? 'Checking...' : 'Get Weather'}
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={handleUseLocation}
            disabled={loading}
          >
            Use my location
          </button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <div className="weather-header">
      <div>
              <h2 className="weather-city">
                {weather.name}
                {weather.country ? `, ${weather.country}` : ''}
              </h2>
              {source === 'location' && (
                <p className="weather-source">Based on your current location</p>
              )}
            </div>
            {weather.icon && (
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description || 'Weather icon'}
              />
            )}
      </div>

          <div className="weather-main">
            <p className="weather-temp">
              <span className="temp-value">{Math.round(weather.temp)}°C</span>
            </p>
            <p className="weather-feels">
              Feels like {Math.round(weather.feelsLike)}°C
            </p>
            {weather.description && (
              <p className="weather-desc">
                {weather.description.charAt(0).toUpperCase() +
                  weather.description.slice(1)}
              </p>
            )}
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-label">Min / Max</span>
              <span className="detail-value">
                {Math.round(weather.tempMin)}°C / {Math.round(weather.tempMax)}°C
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{weather.humidity}%</span>
            </div>
            {typeof weather.windSpeed === 'number' && (
              <div className="detail-item">
                <span className="detail-label">Wind</span>
                <span className="detail-value">{weather.windSpeed} m/s</span>
              </div>
            )}
            <div className="detail-item">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{weather.pressure} hPa</span>
            </div>
            {typeof weather.visibility === 'number' && (
              <div className="detail-item">
                <span className="detail-label">Visibility</span>
                <span className="detail-value">
                  {(weather.visibility / 1000).toFixed(1)} km
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
  )
}

export default App
