import React from 'react'

function CheckBox({facilites,onChange,amities}) {
  return (
    <>
    {
        facilites.map((item,index)=>{
           return <p key={index}>
            <input type="checkbox" name={item.name}  onChange={onChange} value="yes"  checked={amities?.[item.name] === "yes"}/>
            {item.lable}
           </p>
        })
    }
   </>
  )
}
export default CheckBox