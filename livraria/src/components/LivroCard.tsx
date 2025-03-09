'use client'

import { CompraService } from "@/resources/Compra/CompraService"
import { notificacao } from "@/components/notificacao/index"
import { useState } from "react";

interface cardProps {
    titulo?: string;
    autor?: string;
    urlFoto?: string;
    preco?: string;
    comprado?: boolean;
}

export const LivroCard: React.FC<cardProps> = ({ autor, titulo, urlFoto, preco, comprado }) => {

    const notificador = notificacao();
    const [textoBotao, setTextoBotao] = useState<string>(comprado? "Ver livro" : "Comprar");
    
    function comprar(tituloLivro: string) {
        const resposta = CompraService().compraLivro(tituloLivro);
        resposta.then((resposta) => {
            console.log(resposta.status);
            if (resposta.status === 200) {
                setTextoBotao("Ver livro")
                notificador.notificar("Compra realizada", "success");
            } else if (resposta.status === 409) {
                notificador.notificar(resposta.erro, "error");
            }
        })
    }

    return (
        <>
            <div key={titulo} className={`cardLivro rounded-tl-sm rounded-tr-sm shadow-sm shadow-gray-300 pb-4 my-6 text-black pt-1 `}>
                <div className="fotoLivro  mb-3" style={{ backgroundImage: `url(${urlFoto})` }} />
                <h2 className=" font-bold font-sans pl-3  w-full   mt-1">{titulo}</h2>
                <h4 className="w-full  font-sans pl-3  text-gray-700">{autor}</h4>
                <h2 className=" w-full font-thin text-base  text-right pr-3 " >{preco}</h2>
                <div className=" w-full pl-2">
                    <button onClick={ !comprado?  () => comprar(titulo + "") : undefined} type="button" className="text-white z-50  font-serif bg-black p-1 rounded-md" >
                     {textoBotao}
                    </button>
                </div>
            </div>
        </>
    )
}
