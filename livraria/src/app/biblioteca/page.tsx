'use client'

import { LivroCard } from "@/components/LivroCard";
import { Template } from "@/components/Template"
import { Livro } from "@/resources/livro/Livro.resource"
import { LivroService } from "@/resources/livro/Livro.service";
import { useState } from "react";
import { SessaoGenero, LivrosPesquisa } from "@/components/Livros/Livros"


export default function Biblioteca() {


    const livroService = LivroService();
    const [ROMANCE, setROMANCE] = useState<Livro[]>([]);
    const [DRAMA, setDRAMA] = useState<Livro[]>([]);
    const [CIENCIA, setCIENCIA] = useState<Livro[]>([]);
    const [TERROR, setTERROR] = useState<Livro[]>([]);
    const [COMEDIA, setCOMEDIA] = useState<Livro[]>([]);
    const [SUSPENSE, setSUSPENSE] = useState<Livro[]>([]);
    const [bemvindo, setBemvindo] = useState<boolean>(true);


    async function buscarLivros() {
        //Consultado livros de ROMANCE
        const listaRomance = await livroService.buscarLivroPorGenero("ROMANCE");
        setROMANCE(listaRomance);

        //Consultado livros de CIENCIA
        const listaCiencia = await livroService.buscarLivroPorGenero("CIENCIA");
        setCIENCIA(listaCiencia);

        //Consultado livros de DRAMA
        const listaDrama = await livroService.buscarLivroPorGenero("DRAMA");
        setDRAMA(listaDrama);

        //Consultado livros de SUSPENSE
        const listaSuspense = await livroService.buscarLivroPorGenero("SUSPENSE");
        setSUSPENSE(listaSuspense);

        //Consultado livros de TERROR
        const listaTerror = await livroService.buscarLivroPorGenero("TERROR");
        setTERROR(listaTerror);

        //Consultado livros de COMEDIA
        const listaComedia = await livroService.buscarLivroPorGenero("COMEDIA");
        setCOMEDIA(listaComedia);
    }

    function criarCard(livro: Livro) {
        return (
            <LivroCard key={livro.titulo} autor={livro.nomeAutor} titulo={livro.titulo}
                urlFoto={livro.urlImagem} />
        )
    }

    function renderizarCards() {

        if (bemvindo) {
            buscarLivros();
            setBemvindo(false);
        }

        return (
            <>
                <SessaoGenero corGenero="bg-pink-400" genero="ROMANCE" children={ROMANCE.map(criarCard)} />
                <SessaoGenero corGenero="bg-teal-500" genero="CIENCIA" children={CIENCIA.map(criarCard)} />
                <SessaoGenero corGenero="bg-amber-900 " genero="DRAMA" children={DRAMA.map(criarCard)} />
                <SessaoGenero corGenero="bg-black" genero="TERROR" children={TERROR.map(criarCard)} />
                <SessaoGenero corGenero="bg-gray-800" genero="SUSPENSE" children={SUSPENSE.map(criarCard)} />
                <SessaoGenero corGenero="bg-yellow-500" genero="COMEDIA" children={COMEDIA.map(criarCard)} />

            </>

        )


    }

    return (
        <Template childrenHeader={<BarraPesquisa />}>
            <div>
                {
                    //  renderizarCards()
                    <>
                        <AreaFiltro />
                        <LivrosPesquisa></LivrosPesquisa>
                    </>

                }
            </div>

        </Template>

    )
}


const BarraPesquisa: React.FC = () => {
    return (
        <div className="inputHeader m-auto ">
            <div className=" px-1   rounded-full flex  mt-3.5 max-w-72 m-auto h-8 ">
                <input type="text" placeholder="Pesquisar" className="h-10 border border-gray-400   size-full  text-black text-center  rounded-full m-auto" />
                <i className="hover:cursor-pointer  my-2.5 absolute translate-x-72  w-auto h-auto material-icons  text-gray-400  scale-125">search</i>
            </div>
        </div>
    )
}

const AreaFiltro: React.FC = () => {
    const SELECTPADRAO = "Todos";
    const [genero, setGenero] = useState<"DRAMA" | "ROMANCE" | "CIENCIA" | "TERROR" | "COMEDIA" | "SUSPENSE" | null>(null);
    const [titulo, setTitulo] = useState<string>("");
    const [visivel, setVisivel] = useState<string>("hidden");

    function selecionarGenero(genero: any) {
        genero === SELECTPADRAO ? setGenero(null) : setGenero(genero);
    }

    function abrirFiltro() {
        visivel === "hidden" ? setVisivel("") : setVisivel("hidden");

    }
    return (
        <section className="px-6 flex flex-col items-start  ">
            <div onClick={abrirFiltro}
                className="  hover:cursor-pointer border   px-2  h-6 my-0.5 bg-gray-200   ">
                <i className="text-gray-600 border  scale-75  material-icons ">tune</i>
            </div>
            <select onChange={event => selecionarGenero(event.target.value)} className={`${visivel} my-2 text-black font-mono text-sm h-6  rounded-sm px-1`}>
                <option >{SELECTPADRAO}</option>
                <option>ROMANCE</option>
                <option>CIENCIA</option>
                <option>COMEDIA</option>
                <option>TERROR</option>
                <option>SUSPENSE</option>
                <option>DRAMA</option>
            </select>
        </section>
    )
}


