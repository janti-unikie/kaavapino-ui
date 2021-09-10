import React from 'react'
import { useTable } from 'react-table'


function ReportTable({ columns, data }) {
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
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map( (headerGroup, index) => (
            <tr key={headerGroup + index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map( (column, index) => (
                <th key={column + index} {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr key={row+i} {...row.getRowProps()}>
                {row.cells.map( (cell, index) => {
                  return <td key={cell + index} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  export default ReportTable