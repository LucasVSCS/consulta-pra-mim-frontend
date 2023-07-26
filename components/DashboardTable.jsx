import React, { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { useRouter } from 'next/router'
import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'

export default function DashboardTable ({ fetchData }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(0)
  const [sort, setSort] = useState('name')
  const [order, setOrder] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [status, setStatus] = useState('')
  const [cityId, setCityId] = useState('')
  const [name, setName] = useState('')
  const [tradingName, setTradingName] = useState('')
  const [citySearchResults, setCitySearchResults] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchData(
      page,
      sort,
      order,
      rowsPerPage,
      status,
      cityId,
      name,
      tradingName
    ).then(result => {
      setData(result.data)
      setCount(result.total)
    })
  }, [
    fetchData,
    page,
    sort,
    order,
    rowsPerPage,
    status,
    cityId,
    name,
    tradingName
  ])

  const options = {
    filterType: 'checkbox',
    serverSide: true,
    count: count,
    page: page,
    filter: false,
    selectableRows: 'none',
    disableToolbarSelect: true,
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    search: false,
    viewColumns: false,
    onTableChange: (action, tableState) => {
      switch (action) {
        case 'sort':
          setSort(tableState.columns[tableState.activeColumn].name)
          setOrder(tableState.sortOrder.direction)
          break
        case 'changeRowsPerPage':
          setRowsPerPage(tableState.rowsPerPage)
          break
        case 'changePage':
          setPage(tableState.page)
          break
        default:
          break
      }
    }
  }

  const columns = [
    {
      name: 'name',
      label: 'Nome',
      options: {
        sort: true
      }
    },
    {
      name: 'tradingName',
      label: 'Nome Consultoria',
      options: {
        sort: true
      }
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        sort: false
      }
    },
    {
      name: 'city',
      label: 'Cidade',
      options: {
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return `${value.name} - ${value.ufCode}`
        }
      }
    },
    {
      name: 'active',
      label: 'Status',
      options: {
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ? 'Ativo' : 'Inativo'
        }
      }
    },
    {
      name: 'externalId',
      label: 'Ações',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button
              onClick={() => router.push(`/admin/edit-carhunter/${value}`)}
            >
              Editar
            </button>
          )
        }
      }
    }
  ]

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
    <>
      <Grid container spacing={1} mb>
        <Grid item xs>
          <TextField
            fullWidth
            label='Nome'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            label='Nome da Consultoria'
            value={tradingName}
            onChange={e => setTradingName(e.target.value)}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            fullWidth
            options={citySearchResults}
            getOptionLabel={option => `${option.name} - ${option.ufCode}`}
            onChange={(event, newValue) => {
              setCityId(newValue ? newValue.id : '')
            }}
            renderInput={params => (
              <TextField
                {...params}
                label='Cidade'
                onChange={handleCitySearch}
              />
            )}
          />
        </Grid>
        <Grid item xs>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={e => setStatus(e.target.value)}
              label='Status'
            >
              <MenuItem value=''>
                <em>Todos</em>
              </MenuItem>
              <MenuItem value='1'>Ativo</MenuItem>
              <MenuItem value='0'>Inativo</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <MUIDataTable
        title={'Lista de Consultores Cadastrados'}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  )
}
