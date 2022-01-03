import React, {useState}from 'react';
import './App.css';

const api ={
  key : "0b0765e4d854fb78cec42e704b77a43b" ,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  
  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});

  const search = (evt) =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        setQuery('');
        setWeather(result);
        console.log(result);
      });
    }
  }
  const dateBuilder = (d) =>{
    let months =["Januvary","February","March","April","May","june","july",
    "August","September","October","November","December"];
    let days =["Sunday","Monday","Tuesday","Wednesday",
    "Thurday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;


  }
  return (


    <div className={(typeof weather.main !="undefined")? 
    ((weather.main.temp>16)?"app warm":"app") :"app"}>
   <div>
    <h1 className='text'>Enter the Name of  place to know the temperature</h1>
  </div>

  
    <main>

      <div className="search">
        <input type="text"
        className="search-bar"
        placeholder="Search...."
        onChange={e=>setQuery(e.target.value)}
        value={query}
        onKeyPress={search}/>
      </div>
      {(typeof weather.main != "undefined") ?(
        <div>
      <div className="location-box">
        <div className="location">{weather.name},{weather.sys.country}</div>
        <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">
        {Math.round(weather.main.temp)}°C
        </div>
        
        <div className="weather">
          {weather.weather.map(x=>x.description)}
          
        </div>
      </div>
      </div>
       ):('')}
      </main>
      <div>
        <h1>Enter the place to know the temperature</h1>
      </div>

      
      
       
    </div>
  );
}

export default App;
