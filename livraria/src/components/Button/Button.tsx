'use client'


interface buttonProps{
    value: string;
    estilo?: string;
    onclick?: (event: any) => void;
}

export const Button: React.FC<buttonProps> = ({onclick, value, estilo}) =>{

    return(
        <input type="button" className={`${estilo} `} value={value} onClick={onclick} />
    )
}