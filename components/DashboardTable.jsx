import React from 'react'
import MUIDataTable from 'mui-datatables'

export default function DashboardTable () {
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
      name: 'trading_name',
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
        sort: false
      }
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false
      }
    }
  ]

  const data = [
    {
      name: 'John Smith',
      trading_name: 'Smith Consulting',
      email: 'john.smith@example.com',
      city: 'New York',
      status: 'Active'
    },
    {
      name: 'Jane Doe',
      trading_name: 'Doe Consulting',
      email: 'jane.doe@example.com',
      city: 'Los Angeles',
      status: 'Inactive'
    },
    {
      name: 'Bob Johnson',
      trading_name: 'Johnson Consulting',
      email: 'bob.johnson@example.com',
      city: 'Chicago',
      status: 'Active'
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
