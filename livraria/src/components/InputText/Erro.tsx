interface ErroProps{
    erro: any | null;
}

export const ErroCampo: React.FC<ErroProps> =({
    erro
}) => {
    if(erro){
        return(
            <span className="text-red-500 text-sm" >{erro}</span>
        )
    }
    return(<></>)
}