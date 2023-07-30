import { useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'

export default function CityInput ({
  size = 'small',
  label = 'Cidade',
  variant = 'outlined',
  value,
  onChange,
  sx
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const [citySearchResults, setCitySearchResults] = useState([])

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
      sx={sx}
      size={size}
      options={citySearchResults}
      getOptionLabel={option => `${option.name} - ${option.ufCode}`}
      value={value || null}
      onChange={onChange}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          onChange={handleCitySearch}
          variant={variant}
        />
      )}
    />
  )
}
