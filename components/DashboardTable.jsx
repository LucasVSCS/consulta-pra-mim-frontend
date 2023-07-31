import React, { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { useRouter } from 'next/router'
import DashboardSearchFilter from './DashboardSearchFilter'

export default function DashboardTable ({ fetchData }) {
  const router = useRouter()
  const [data, setData] = useState([])

  // Pagination and Sorting States
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(0)
  const [sort, setSort] = useState('name')
  const [order, setOrder] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [filters, setFilters] = useState({
    status: '',
    cityId: '',
    name: '',
    tradingName: ''
  })

  useEffect(() => {
    fetchData(
      page,
      sort,
      order,
      rowsPerPage,
      filters.status,
      filters.cityId,
      filters.name,
      filters.tradingName
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
    filters.status,
    filters.cityId,
    filters.name,
    filters.tradingName
  ])

  const handleSearch = values => {
    setFilters({
      status: values.status,
      cityId: values.selectedCity?.id ?? '',
      name: values.name,
      tradingName: values.tradingName
    })
  }

  const handleClearFilters = () => {
    setFilters({
      status: '',
      cityId: '',
      name: '',
      tradingName: ''
    })
  }

  const options = {
    filterType: 'checkbox',
    serverSide: true,
    count: count,
    page: page,
    filter: false,
    selectableRows: 'none',
    selectToolbarPlacement: 'none',
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
      name: 'isActive',
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

  return (
    <>
      <DashboardSearchFilter
        onSearch={handleSearch}
        onClearFilters={handleClearFilters}
      />

      <MUIDataTable
        title={'Lista de Consultores Cadastrados'}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  )
}
