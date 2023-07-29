import { Autocomplete, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

export default function CityInput ({
  size = 'small',
  selectedCity,
  setSelectedCity
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const [citySearchResults, setCitySearchResults] = useState([])
  const [internalSelectedCity, setInternalSelectedCity] = useState(selectedCity)

  useEffect(() => {
    console.log(selectedCity)
    setInternalSelectedCity(selectedCity)
    console.log(internalSelectedCity)
  }, [selectedCity])

  const handleCitySearch = async event => {
    const value = event.target.value
    if (value.length >= 3) {
      const response = await fetch(`${apiUrl}/cities/get-by-name?name=${value}`)
      const data = await response.json()
      setCitySearchResults(data)
    } else {
      setCitySearchResults([])
    }
  }

  return (
    <Autocomplete
      fullWidth
      sx={{ marginTop: 2 }}
      size={size}
      options={citySearchResults}
      getOptionLabel={option => `${option.name} - ${option.ufCode}`}
      value={internalSelectedCity}
      onChange={(event, newValue) => {
        setInternalSelectedCity(newValue)
        setSelectedCity(newValue)
      }}
      renderInput={params => (
        <TextField {...params} label='Cidade' onChange={handleCitySearch} />
      )}
    />
  )
}
