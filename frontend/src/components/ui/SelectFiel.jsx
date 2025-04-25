import React from 'react'

function SelectFiel({lable,name,options,onChange,value,...rest}) {
  return (
    <div>
        <p> {lable}<span>*</span></p>
        <select name={name} onChange={onChange} value={value} {...rest} >
            {
                options.map((item,index)=>{
                  if(typeof item==="string"){

                    return <option  key={index} value={item}>{item}</option>
                  }
                  else{
                    return <option  key={index} value={item.value}>{item.option}</option>
                  }
                })
            }
        </select>

    </div>
  )
}

export default SelectFiel