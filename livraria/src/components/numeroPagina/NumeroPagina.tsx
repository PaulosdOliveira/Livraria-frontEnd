'use client'



interface numeroPaginaProps {
    numero: number;
    onClick?: (event: any) => void;
}

export const NumeroPagina: React.FC<numeroPaginaProps> = ({ numero, onClick }) => {

    return (
        <p onClick={() => onClick ? onClick(numero - 1) : undefined}
            className="text-white text-center  hover:-translate-y-0.5 cursor-pointer
         p-1.5 w-9 h-9 mx-0.5 bg-gray-500 inline-block rounded-full transition-all duration-300">{numero}</p>
    )
}





