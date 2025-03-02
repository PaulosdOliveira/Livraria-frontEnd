'use client'

import { LivroCard } from "@/components/LivroCard";
import { RenderIf, Template } from "@/components/Template"
import { Livro } from "@/resources/livro/Livro.resource"
import { LivroService } from "@/resources/livro/Livro.service";
import { useState } from "react";
import { SessaoGenero, LivrosPesquisa } from "@/components/Livros/Livros"


export default function Biblioteca() {

    // Serviço de consulta de livros
    const livroService = LivroService();


    //Propriedades de armazenamento de consulta  padrão
    const [ROMANCE, setROMANCE] = useState<Livro[]>([]);
    const [DRAMA, setDRAMA] = useState<Livro[]>([]);
    const [CIENCIA, setCIENCIA] = useState<Livro[]>([]);
    const [TERROR, setTERROR] = useState<Livro[]>([]);
    const [COMEDIA, setCOMEDIA] = useState<Livro[]>([]);
    const [SUSPENSE, setSUSPENSE] = useState<Livro[]>([]);
    //** */

    const [bemvindo, setBemvindo] = useState<boolean>(true);
    const [pesquisou, setPesquisou] = useState<boolean>(false);


    //Propriedades de consulta do usuário
    const SELECTPADRAO = "Todos";
    const [genero, setGenero] = useState<"DRAMA" | "ROMANCE" | "CIENCIA" | "TERROR" | "COMEDIA" | "SUSPENSE" | undefined>(undefined);
    const [titulo, setTitulo] = useState<string>("");

    function selecionarGenero(generoSelecionado: any) {
        setGenero(generoSelecionado);
        exibirGeneroSelecionado(generoSelecionado);
    }


    //Método de consulta padrao
    async function buscarLivros() {
        //Consultado livros de ROMANCE
        const listaRomance = await livroService.buscarLivros("ROMANCE", "");
        setROMANCE(listaRomance);

        //Consultado livros de CIENCIA
        const listaCiencia = await livroService.buscarLivros("CIENCIA", "");
        setCIENCIA(listaCiencia);

        //Consultado livros de DRAMA
        const listaDrama = await livroService.buscarLivros("DRAMA", "");
        setDRAMA(listaDrama);

        //Consultado livros de SUSPENSE
        const listaSuspense = await livroService.buscarLivros("SUSPENSE", "");
        setSUSPENSE(listaSuspense);

        //Consultado livros de TERROR
        const listaTerror = await livroService.buscarLivros("TERROR", "");
        setTERROR(listaTerror);

        //Consultado livros de COMEDIA
        const listaComedia = await livroService.buscarLivros("COMEDIA", "");
        setCOMEDIA(listaComedia);
    }

    //Transformando um objeto Livro em LivroCard
    function criarCard(livro: Livro) {
        return (
            <LivroCard key={livro.titulo} autor={livro.nomeAutor} titulo={livro.titulo}
                urlFoto={livro.urlImagem} preco={livro.preco} />
        )
    }


    //Renderizando livros ao carregar a pagina
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


    //Método de consulta do usuário
    async function pesquisarLivros(genero: any, titulo: string | undefined) {
        const livros = await livroService.buscarLivros(genero, titulo);
        //Usando a lista de livros de romance como suporte
        setROMANCE(livros);
        setPesquisou(true);
    }

    //Exibindo o resultado da pesquisa
    function resultadoPesquisa() {
        if (!ROMANCE.length) {
            return (
                <h1 className="text-black">Not found</h1>
            )

        }
        return (
            ROMANCE.map(criarCard)
        )
    }

    //Pesquisando  ao clicar na lupa
    function exibirResultado() {
        pesquisarLivros(genero, titulo);
    }

    //Pesquisar ao selecionar genero
    function exibirGeneroSelecionado(generoSelecionado: string) {
        pesquisarLivros(generoSelecionado, titulo);
    }

    return (
        <Template childrenHeader={<BarraPesquisa pesquisar={exibirResultado} onChange={event => setTitulo(event.target.value)} />}>
            <div>
                {
                    <>
                        <AreaFiltro selectPadrao={SELECTPADRAO} onChange={selecionarGenero} />
                        <RenderIf condicao={!pesquisou}>
                            {renderizarCards()}
                        </RenderIf>
                        <RenderIf condicao={pesquisou}>
                            <LivrosPesquisa>{resultadoPesquisa()}</LivrosPesquisa>
                        </RenderIf>
                    </>

                }
            </div>

        </Template>

    )
}


//Renderiza a barra de pesquisa no header
interface barraProps {
    onChange?: (event: any) => void;
    pesquisar: (event: any) => void;
}

const BarraPesquisa: React.FC<barraProps> = ({ onChange, pesquisar }) => {
    return (
        <div className="inputHeader m-auto ">
            <div className=" px-1   rounded-full flex  mt-3.5 max-w-72 m-auto h-8 ">
                <input onChange={onChange} type="text" placeholder="Pesquisar" className="h-10 border border-gray-400   size-full  text-black text-center  rounded-full m-auto" />
                <i onClick={pesquisar}
                    className="hover:cursor-pointer  my-2.5 absolute translate-x-72  w-auto h-auto material-icons  text-gray-400  scale-125">search</i>
            </div>
        </div>
    )
}

//Renderiza icone de filtro para selecionar o tipo de genero a ser buscado

interface filtroProps {
    selectPadrao: string;
    onChange: (event: any) => void;
}

const AreaFiltro: React.FC<filtroProps> = ({ onChange, selectPadrao }) => {

    const [visivel, setVisivel] = useState<string>("hidden");

    function abrirFiltro() {
        visivel === "hidden" ? setVisivel("") : setVisivel("hidden");

    }
    return (
        <section className="px-6 flex flex-col items-start  ">
            <div onClick={abrirFiltro}
                className="  hover:cursor-pointer border   px-2  h-6 my-0.5 bg-gray-200   ">
                <i className="text-gray-600 border  scale-75  material-icons ">tune</i>
            </div>
            <select onChange={event => onChange(event.target.value)} className={`${visivel} my-2 text-black font-mono text-sm h-6  rounded-sm px-1`}>
                <option >{selectPadrao}</option>
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


