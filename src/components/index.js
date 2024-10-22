import { useState, useEffect } from 'react'
import Header from "./header"
import Footer from "./footer"
import axios from 'axios'

import { citiesContext, SelectedCityProvider } from "./context"

import "./style.css"

function Main() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://turkiyeapi.dev/api/v1/provinces')
      .then(response => {
        setData(response.data.data.map((e) => [e.name, e.coordinates]));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <citiesContext.Provider value={data}  >
      <SelectedCityProvider>
        <Header />
        <Footer />
      </SelectedCityProvider>

    </citiesContext.Provider>
  )
}

export default Main