import React, { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { useRouter } from 'next/router'
import DashboardSearchFilter from './DashboardSearchFilter'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import { deleteCarhunter } from '../services/actions/deleteCarhunter'
import { useSnackbar } from 'notistack'

export default function DashboardTable ({ fetchData }) {
  const router = useRouter()
  const [data, setData] = useState([])
  const { enqueueSnackbar } = useSnackbar()

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

  const handleRemove = value => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      deleteCarhunter(value).then(response => {
        if (response.success) {
          return enqueueSnackbar('Consultor removido com sucesso!', {
            variant: 'success'
          })
        }

        return enqueueSnackbar('Erro ao remover Consultor!', {
          variant: 'error'
        })
      })
    }
  }

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
    setTableProps: () => {
      return {
        size: 'small'
      }
    },
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
            <>
              <IconButton
                aria-label='Editar'
                size='small'
                onClick={() => router.push(`/admin/edit-carhunter/${value}`)}
                color='primary'
              >
                <EditIcon />
              </IconButton>

              <IconButton
                aria-label='Remover'
                size='small'
                color='error'
                onClick={() => handleRemove(value)}
              >
                <DeleteIcon />
              </IconButton>
            </>
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
