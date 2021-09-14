import React from 'react'
import { useTable } from 'react-table'

function ReportTable({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth:100,
      width: 100,
      maxWidth: 80
    }),
    []
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    defaultColumn
  })
  // Render the UI for your table
  return (
    <div className="report-table">
      <table {...getTableProps()}>
        <thead>
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
                  {...column.getHeaderProps()}
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
              <tr className="table-data-row" key={row + i} {...row.getRowProps()}>
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
