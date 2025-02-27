

interface itemProps {
    texto: string;
    onClick?: (event: any) => void;
}

export const ItemLista: React.FC<itemProps> = ({ texto , onClick}) => {
    return (
        <li id="itemMenu" onClick={onClick}
            className="  transition duration-500 hover:bg-slate-0  border border-gray-300 px-7 rounded-sm hover:cursor-pointer my-1 text-gray-600 ">
            {texto}
        </li>
    )
}