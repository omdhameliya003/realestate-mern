import React from 'react'

function TextArea({lable,name,required=false,onChange,...rest}) {
  return (
    <div>
        <p>
              {lable} { required && <span>*</span>}
            </p>
            <textarea
              name={name}
             {...rest}
             onChange={onChange}
            ></textarea>
    </div>
  )
}

export default TextArea