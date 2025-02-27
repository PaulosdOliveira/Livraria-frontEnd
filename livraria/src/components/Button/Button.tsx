'use client'


interface buttonProps{
    value: string;
    estilo?: string;
    onclick?: (event: any) => void;
    type?: "button" | "submit" | undefined;
}

export const Button: React.FC<buttonProps> = ({onclick, value, estilo, type}) =>{

    return(
        <input type={type} className={`${estilo} `} value={value} onClick={onclick} />
    )
}