import React from 'react'
import { useTable } from 'react-table'

function ReportTable({ columns, data }) {

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  })
  // Render the UI for your table
  return (
    <div className="report-table">
      <table {...getTableProps()}>
        <thead className="table-header">
          {headerGroups.map((headerGroup, index) => (
            <tr
              className="table-column"
              key={headerGroup + index}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column, index) => (
                <th
                  className="table-header"
                  key={column + index}
                  {...column.getHeaderProps({
                    style: {
                      minWidth: column.minWidth ? column.minWidth : 120,
                      width: column.width ? column.width : 120
                    }
                  })}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr className="table-data-row" key={row + i} {...row.getRowProps({style: {textOverflow: 'ellipsis'}})}>
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      className="table-data"
                      key={cell + index}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ReportTable
