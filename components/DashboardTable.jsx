import React, { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { useRouter } from 'next/router'

export default function DashboardTable ({ fetchData }) {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(0)
  const [sort, setSort] = useState('name')
  const [order, setOrder] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const router = useRouter()

  useEffect(() => {
    fetchData(page, sort, order, rowsPerPage).then(result => {
      setData(result.data)
      setCount(result.total)
    })
  }, [fetchData, page, sort, order, rowsPerPage])

  const options = {
    filterType: 'checkbox',
    serverSide: true,
    count: count,
    page: page,
    onTableChange: (action, tableState) => {
      if (action === 'changePage') {
        setPage(tableState.page)
      }
    }
  }

  const columns = [
    {
      name: 'name',
      label: 'Nome',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'tradingName',
      label: 'Nome Consultoria',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'city',
      label: 'Cidade',
      options: {
        filter: true,
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
        filter: true,
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
            <button onClick={() => router.push(`/admin/edit-carhunter/${value}`)}>
              Editar
            </button>
          )
        }
      }
    }
  ]

  return (
    <MUIDataTable
      title={'Lista de Consultores Cadastrados'}
      data={data}
      columns={columns}
      options={options}
    />
  )
}
