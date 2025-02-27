'use client'

interface inputProps{
    type?: string;
    estilo?: string;
    placeholder?: string;
    id: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

export const Input: React.FC<inputProps> = ({ onChange,value , id, estilo, placeholder, type = "text"}) =>{
    return(
        <input value={value} id={id} type={type} placeholder={placeholder}
         className={`${estilo} `} onChange={onChange}/>
    )
}