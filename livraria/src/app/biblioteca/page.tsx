'use client'

import { LivroCard } from "@/components/LivroCard";
import { Template } from "@/components/Template"
import { Livro } from "@/resources/livro/Livro.resource"
import { LivroService } from "@/resources/livro/Livro.service";
import { useState } from "react";


export default function Biblioteca() {


    const livroService = LivroService();
    const [livros, setLivros] = useState<Livro[]>([]);
    const [bemvindo, setBemvindo] = useState<boolean>(true);


    async function buscarLivros() {
        const resultado = await livroService.buscarLivroPorGenero("SUSPENSE");
        setLivros(resultado);
    }

    function criarCard(livro: Livro) {
        console.log(livro.urlImagem)
        return (
            <LivroCard id={livro.titulo} autor={livro.nomeAutor} titulo={livro.titulo}
                urlFoto={livro.urlImagem} />
        )
    }

    function renderizarCards() {
        if(bemvindo){
            buscarLivros();
            setBemvindo(false);
        }

       
        return livros.map(criarCard);
    }

    return (
        <Template>
            <div>
                {
                    renderizarCards()
                }
            </div>

        </Template>

    )
}


