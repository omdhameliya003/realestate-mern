import React from 'react'

function CheckBox({facilites,onChange, propertydata}) {
  console.log("checkbox propertyData:-",propertydata)
  return (
    <>
    {
        facilites.map((item,index)=>{
           return <p key={index}>
            <input type="checkbox" name={item.name}  onChange={onChange} value="yes"/>
            {item.lable}
           </p>
        })
    }
   </>
  )
}
export default CheckBox