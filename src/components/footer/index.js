import { useContext, useState, useEffect } from 'react'
import { selectedCityContext } from '../context'
import axios from 'axios';
import moment, { weekdays, weekdaysMin, weekdaysShort } from 'moment'
import sun from './images/sun.png'
import cloud from './images/cloudy.png'
import rain from './images/heavy-rain.png'
import snow from './images/snow.png'

function Footer() {

  const [weather, setWeather] = useState()
  const { selectedCity, setSelectedCity } = useContext(selectedCityContext)
  const imageSelector = (e) => {
    switch (e) {
      case 0:
        return sun
      case 1:
      case 2:
      case 3:
      case 45:
      case 48:
        return cloud
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
      case 80:
      case 81:
      case 82:

        return rain
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:

        return snow

    }
  }

  useEffect(() => {
    if (selectedCity[0].length > 0) {
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${selectedCity[1].latitude}&longitude=${selectedCity[1].longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min`)
        .then(response => {
          setWeather(response.data);
          console.log("Veri Alındı", `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity[1].latitude}&longitude=${selectedCity[1].longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min`, response.data.data)
        })
        .catch(error => {
          console.log(error);
        });

    }
  }, [selectedCity]);


  
  return (
    <div>

      <table>
        <tbody>
          <tr>

            {(selectedCity[0].length > 0 && weather) && weather.daily.time.map((e, i) => <td className={i === 0 ? "today" : ""}> {weekdaysShort(moment(e).day())}</td>)}

          </tr>
          <tr>
            {(selectedCity[0].length > 0 && weather) && weather.daily.weather_code.map((e, i) => <td className={i === 0 ? "today" : ""}><img src={imageSelector(e)} alt={e}></img> </td>)}

          </tr>
          <tr>
            {(selectedCity[0].length > 0 && weather) && weather.daily.temperature_2m_max.map((e, i) => <td className={i === 0 ? "today" : ""}> {e}°C<span className='low'>{weather.daily.temperature_2m_min[i]}°C</span></td>)}

          </tr>

        </tbody>
      </table>
    </div>
  )
}

export default Footer
