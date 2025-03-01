'use client'






interface cardProps {
    titulo?: string;
    autor?: string;
    urlFoto?: string;
    preco?: string;
}

export const LivroCard: React.FC<cardProps> = ({ autor, titulo, urlFoto, preco }) => {

    return (
        <div key={titulo}  className={`cardLivro transition-all duration-300 max-h-screen   flex flex-col  items-center mx-4 my-2   rounded-t-sm`}>
            <div className="text-white text-center absolute bg-purple-950 w-16 h-6 rounded-s-full translate-x-16  -translate-y-4">39,90$</div>
            <div className=" bg-cover  h-56 w-40 mt-4" style={{ backgroundImage: `url(${urlFoto})` }} />
            <h2 className="text-black  w-full  text-center mt-1">{titulo}</h2>
            <h4 className="w-full  font-sans  text-left text-gray-700">{autor}</h4>
        </div>
    )
}
