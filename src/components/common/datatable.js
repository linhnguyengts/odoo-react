import React, { Component, Fragment } from 'react';
import { useTable } from 'react-table'

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })
  
    // Render the UI for your table
    return (
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

export const Datatable =  ({data}) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Mã đơn hàng',
                accessor: 'name',
              },
              {
                Header: 'Ngày',
                accessor: 'date_order',
              },              
              {
                Header: 'Khách hàng',
                accessor: 'partner_id[1]',
              },
              {
                Header: 'Tổng',
                accessor: 'amount_total',
              },
              {
                Header: 'Trạng thái',
                accessor: 'state'
              },              
        ],
        []
      )
    
      //const dataOrders = React.useMemo(() => data(20), [])    

    // Render the UI for your table
    return (
      <Table columns={columns} data={data} />
    )
}
