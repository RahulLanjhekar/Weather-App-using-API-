import React, {useState, useEffect} from 'react'
import "./style.css"

const Html = () => {
    const [cityName, setcityName] = useState("bangalore");
    const [weatherData, setweatherData] = useState({}); // USED TO STORE THE DATA FROM THE API

                // DESTRUCTURING THE API DATA FOR USE
    
    const {
        temp,
        pressure,
        humidity,
        weatherMood, 
        speed,
        country,
        sunset,
        name
    } = weatherData;

    const searchWeather = async () => {
        try {
            
            // FETCHING DATA FROM THE API

            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=8988d88b7c401b8b9d2646f5cf4df0ec`

            let resp = await fetch(url);
            let data = await resp.json();

            // DESTRUCTURING THE API DATA WE NEED

            const {temp, pressure, humidity} = data.main;
            const {main: weatherMood} = data.weather[0];
            const {speed} = data.wind;
            const {country, sunset} = data.sys;
            const {name} = data;
            
            const weatherVariables = {
                temp,
                pressure,
                humidity,
                weatherMood,
                speed,
                country,
                sunset,
                name
            };

            setweatherData(weatherVariables);
        } catch (error) {
            console.log(error);
        }
    }

useEffect(() => {
    searchWeather();
}, [])

 // converting the seconds into time
 let sec = sunset;
 let date = new Date(sec * 1000);
 let timeStr = `${date.getHours()}:${date.getMinutes()}`;

 const [weatherState, setWeatheState] = React.useState("");
 
 useEffect(() => {
    if (weatherMood) {
      switch (weatherMood) {
        case "Clouds":
          setWeatheState("wi-day-cloudy");
          break;
        case "Haze":
          setWeatheState("wi-fog");
          break;
        case "Clear":
          setWeatheState("wi-day-sunny");
          break;
        case "Mist":
          setWeatheState("wi-dust");
          break;

        default:
          setWeatheState("wi-day-sunny");
          break;
      }
    }
  }, [weatherMood]);

    return (
        <>
            <div className='searchBar'>
                <input type="text" className='input' placeholder='Search City' value={cityName} onChange={(e) => setcityName(e.target.value)}/>
                <button className='searchButton' onClick={searchWeather}>Search</button>
            </div>
            <div className='content'>
                <div className='icon'>
                    <i className={`wi ${weatherState}`}></i>
                </div>
                <div className='main-content'>
                    <div className='time'>
                        <div className='temp'>
                            <h1>{temp}&deg;</h1>
                        </div>
                        <div className='mood'>
                            <div className='weather-mood'>
                                {weatherMood}
                            </div>
                            <div className='place'>
                                {name}, {country}
                            </div>
                        </div>
                    </div>
                    <div className='date'>
                    {new Date().toLocaleString()}
                    </div>
                </div>
                <div className='not-main'>
                    <div className='sections'><p><i className="wi wi-sunset"></i></p> {timeStr} PM<br /> Sunset</div>
                    <div className='sections'><p><i className="wi wi-humidity"></i></p> {humidity} <br /> Humidity</div>
                    <div className='sections'><p><i className="wi wi-rain"></i></p> {pressure} <br /> Pressure</div>
                    <div className='sections'><p><i className="wi wi-strong-wind"></i></p> {speed} <br /> Wind</div>
                </div>
            </div>
        </>
    )
}

export default Html
