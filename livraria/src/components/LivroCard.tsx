'use client'

import { CompraService } from "@/resources/Compra/CompraService"

interface cardProps {
    titulo?: string;
    autor?: string;
    urlFoto?: string;
    preco?: string;
}

export const LivroCard: React.FC<cardProps> = ({ autor, titulo, urlFoto, preco }) => {

    function comprar(tituloLivro: string ) {
        CompraService().compraLivro(tituloLivro);
    }

    return (
        <>
            <div key={titulo} className={`cardLivro rounded-tl-sm rounded-tr-sm shadow-sm shadow-gray-300 pb-4 my-6 text-black pt-1 `}>
                <div className="fotoLivro  mb-3" style={{ backgroundImage: `url(${urlFoto})` }} />
                <h2 className=" font-bold font-sans pl-3  w-full   mt-1">{titulo}</h2>
                <h4 className="w-full  font-sans pl-3  text-gray-700">{autor}</h4>
                <h2 className=" w-full font-thin text-base  text-right pr-3 " >{preco}</h2>
                <div className=" w-full pl-2">
                    <button onClick={() => comprar(titulo + "")} type="button" className="text-white z-50  font-serif bg-black p-1 rounded-md" >Comprar</button>
                </div>
            </div>
        </>
    )
}
