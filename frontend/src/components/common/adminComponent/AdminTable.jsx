import React from 'react'
import "./AdminTables.css"

function AdminTable({column,limit,data}) {
    const displayData= limit ? data?.slice(0,limit): data ;
  return (
    <div className='table-container'>
    <table>
          <thead>
              <tr>
            {
                column && column.map((col)=>{
                    return <th key={col.key}>{col.lable}</th>
                })
            }
            </tr>
          </thead>
          <tbody>
            {displayData && displayData.slice(0,5).map((item) => {
               return <tr key={item._id}>
                {
                    column && column.map((col)=>{
                       return <td key={col.key}>{ col.render? col.render(item) : item[col.key]}</td>
                    })}
                </tr>
              })}
          </tbody>
        </table>
         </div>
  )
}

export default AdminTable