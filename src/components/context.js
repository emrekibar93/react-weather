import { createContext, useState, useContext } from 'react'

const citiesContext = createContext([{}]);
const selectedCityContext = createContext();


export const SelectedCityProvider = ({ children }) => {
    const [selectedCity, setSelectedCity] = useState([{}]);

    const values =
    {
        selectedCity,
        setSelectedCity
    }

    return (
        <selectedCityContext.Provider value={values} >{children}</selectedCityContext.Provider>
    )
}

export { citiesContext, selectedCityContext, useContext }
