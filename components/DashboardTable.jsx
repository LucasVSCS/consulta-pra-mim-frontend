import React from 'react'
import MUIDataTable from 'mui-datatables'

export default function DashboardTable ({ data }) {
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
    }
  ]

  const options = {
    filterType: 'checkbox'
  }

  return (
    <MUIDataTable
      title={'Lista de Consultores Cadastrados'}
      data={data}
      columns={columns}
      options={options}
    />
  )
}
