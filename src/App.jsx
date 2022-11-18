import { useState } from 'react'
import Search from './components/search'
import './App.css'
import CurrentWeather from './components/current-weather/CurrentW'
import {WEATHER_API_KEY,WEATHER_API_URL} from './api'
import ForeCast from './components/forecast/ForeCast'

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const[lat , lon] = searchData.value.split("");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async(response) =>{
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();
      setCurrentWeather({city: searchData.label ,...weatherResponse});
      setForecast({city: searchData.label ,...forecastResponse});
    })
    .catch(error =>{
      console.log(error);
    })
  }
 
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      { currentWeather && <CurrentWeather data={currentWeather}/>}
      { forecast && <ForeCast data={forecast}/>}
    </div>
  )
}

export default App
