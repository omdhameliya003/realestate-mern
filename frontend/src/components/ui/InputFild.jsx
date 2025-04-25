import React from 'react'

function InputFild({lable,type,name,required=false,...rest }) {
  return (
    <div>
       <p>{lable} { required && <span>*</span>}</p>   
    <input type={type} name={name} onChange={onchange} {...rest} />

    </div>
  )
}

export default InputFild