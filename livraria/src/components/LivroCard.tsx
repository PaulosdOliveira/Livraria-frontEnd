'use client'





interface classesAdicionais{
    classes?: string;
}


export const LivroCard: React.FC<classesAdicionais> = ({classes}) => {
    
    return (
        <div className={`${classes}  cardLivro transition-all duration-300 max-h-screen   bg-transparent flex flex-col  items-center mx-4 my-2  rounded-t-sm`}>
            <div className="text-white text-center absolute bg-purple-950 w-16 h-6 rounded-s-full translate-x-16 -translate-y-4">33,99$</div>
            <div id="capaLivro" className=" rounded-sm h-52 w-32 mt-4" />
            <h2 className="text-black  w-full  text-center mt-1">Relatos por trás do céu</h2>
            <h4 className="w-full  font-sans  text-left text-gray-700">Paulo Oliveira</h4>
        </div>
    )
}
