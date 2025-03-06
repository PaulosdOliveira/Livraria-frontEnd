interface ErroProps {
    erro: any | null;
}

export const ErroCampo: React.FC<ErroProps> = ({
    erro
}) => {

    return (
        <div className="text-red-500 text-sm  h-5 " >{erro}</div>
    )

}