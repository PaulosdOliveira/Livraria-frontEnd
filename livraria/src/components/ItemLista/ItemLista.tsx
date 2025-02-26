

interface itemProps{
    texto: string;
}

export const ItemLista: React.FC<itemProps> = ({texto}) =>{
    return(
        <li id="itemMenu" className="  transition duration-500 hover:bg-slate-0  border border-gray-300 px-7 rounded-sm hover:cursor-pointer my-1 text-gray-600 ">{texto}</li>
    )
}