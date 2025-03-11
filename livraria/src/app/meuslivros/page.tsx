'use client'

import { LivroCard } from "@/components/LivroCard"
import { Template } from "@/components/Template"
import { CompraService } from "@/resources/Compra/CompraService"
import { Livro } from "@/resources/livro/Livro.resource"

import { useState } from "react"


export default function MeusLivros() {


    const [meusLivros, setMeusLivros] = useState<Livro[]>();
    const servicoCompra = CompraService();
    const [bemVindo, setBemVindo] = useState<boolean>(true);

    function gerarCards(livro: Livro) {
        return <LivroCard key={livro.titulo} autor={livro.nomeAutor} comprado={true}
            preco={livro.preco} titulo={livro.titulo} urlFoto={livro.urlImagem}
        />
    }

    async function buscarMeusLivros() {
        const resultado = await servicoCompra.meusLivros();
        if (resultado) {
            setMeusLivros(resultado);
            setBemVindo(false);
        }
        return (
            <h3 className="text-black">Voce ainda naõ possui livros</h3>
        )
    }

    function renderizarLivros() {
        bemVindo ? buscarMeusLivros() : undefined;
        if (meusLivros) {
            return (
                meusLivros?.map(gerarCards)
            )
        }
    }


    return (
        <Template>
            <h2 className="text-black text-center text-2xl">Meus livros</h2>
            <div id="gridPesquisa" style={{ width: 'auto', height: 'auto' }}
                className="  grid grid-cols-2   m-auto ">
                {renderizarLivros()}
            </div>

        </Template>
    )
}