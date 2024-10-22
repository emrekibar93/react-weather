import { useContext, useState, useEffect } from 'react'
import { citiesContext, selectedCityContext } from '../context'



function Header() {
  const [userLocation, setUserLocation] = useState(null);
  const { selectedCity, setSelectedCity } = useContext(selectedCityContext)
  const data = useContext(citiesContext)

  useEffect(() => {
    // Kullanıcının konumunu al
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        //console.log(data.filter((word)=> word.latitude.toString().slice(0,2)===latitude.toString().slice(0,2) ),"bulundu")

      },
      (error) => {
        console.error('Konum alınamadı:', error.message);
       }
    );

  }, []);

  useEffect(() => {
    // data.map((e)=> console.log(e[1].latitude.toString().slice(0,4)) ) 
   
    try {
      const positionCity = data.filter((word) => 
        word[1].latitude.toString().slice(0, 4) === userLocation.latitude.toString().slice(0, 4) 
        && word[1].longitude.toString().slice(0, 4) === userLocation.longitude.toString().slice(0, 4))
  
      console.log(positionCity, "bulundu")
      
      positionCity.length>0&&setSelectedCity(...positionCity)
      
      } catch (e) {
      console.log('Error ')
      setSelectedCity(["Adana",  {latitude: 37.001667, longitude: 35.328889}])
     
        
      
     
       
        
      }
  
    

  }, [data,userLocation])


  const selected = ((e) => {

    setSelectedCity(data.find(element => element[0] === e.target.value))
    console.log("secildi", e.target.value, data.find(element => element[0] === e.target.value))
  })

  return (
    <div className='header'>
      <select name="cities" id="cities" value={selectedCity[0]}  onChange={e => selected(e)}>
        {data.map((e, i) => <option key={300 + i} value={e[0]}>{e[0]}</option>)}
      </select>



    </div>
  )
}

export default Header
