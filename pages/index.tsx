import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { useState } from 'react';
import Image from 'next/image';


const API_KEY: string = "cefed0324d01b6f18d8501bd381c615e";
const URL = "https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&";


const Home: NextPage = () => {

  const [query, setQuery] = useState<string>("");
  const [weather, setWeather] = useState<any>({});

  const fetchWeather = async (query: string) => {
    const res = await fetch(`${URL}q=${query}&&appid=${API_KEY}&units=metric`);
    const data = await res.json();
    return data;
  }

  const search = async (e: any) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      console.log(data);
      setWeather(data);
      setQuery("");
    }
  }


  return (
    <div className="main-container">
      <input
        type="text"
        className='search'
        placeholder='Search...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.city && (
        <div className='city'>
          <h2 className="city-name">
            <span>{weather.city.name}</span>
            <sup>{weather.city.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.list[0].main.temp)}
            <sup>&deg; C</sup>
          </div>
          <div className="info">
            <div style={{ width: "54px", height: "54px", position: "relative" }}>
              <Image src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`} alt={weather.list[0].weather[0].description} layout="fill" className="city-icon" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home;

