import React from 'react'


interface ButtonProps {
    title? : string ;
    onClick? : () => void ;
    className? : string ;
    
}

function Button({title,className,onClick}:ButtonProps) {
  return (
    <button 
    onClick={onClick} 
    className={className}>
    {title}
    </button>
  )
}

export default Button;