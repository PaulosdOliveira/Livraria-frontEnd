'use client'

interface inputProps{
    type?: string;
    estilo?: string;
    placeholder?: string;
}

export const Input: React.FC<inputProps> = ({ estilo, placeholder, type = "text"}) =>{
    return(
        <input type={type} placeholder={placeholder} className={`${estilo} `}/>
    )
}