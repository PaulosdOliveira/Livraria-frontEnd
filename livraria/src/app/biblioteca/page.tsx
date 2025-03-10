'use client'

import { LivroCard } from "@/components/LivroCard";
import { RenderIf, Template } from "@/components/Template"
import { Livro, PaginaLivro } from "@/resources/livro/Livro.resource"
import { LivroService } from "@/resources/livro/Livro.service";
import { useState } from "react";
import { SessaoGenero, LivrosPesquisa } from "@/components/Livros/Livros"
import { NumeroPagina } from "@/components/numeroPagina/NumeroPagina"



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
    const [pesquisa, setPesquisa] = useState<PaginaLivro>();
    //** */

    const [bemvindo, setBemvindo] = useState<boolean>(true);
    const [pesquisou, setPesquisou] = useState<boolean>(false);


    //Propriedades de consulta do usuário
    const [genero, setGenero] = useState<"DRAMA" | "ROMANCE" | "CIENCIA" | "TERROR" | "COMEDIA" | "SUSPENSE" | undefined>(undefined);
    const [titulo, setTitulo] = useState<string>("");

    function selecionarGenero(generoSelecionado: any) {
        setGenero(generoSelecionado);
        pesquisarGenero(generoSelecionado);
    }


    //Método de consulta padrao
    async function buscarLivros() {
        //Consultado livros de ROMANCE
        const listaRomance = await livroService.buscarSeesaoGenero("ROMANCE");
        setROMANCE(listaRomance);

        //Consultado livros de CIENCIA
        const listaCiencia = await livroService.buscarSeesaoGenero("CIENCIA");
        setCIENCIA(listaCiencia);

        //Consultado livros de DRAMA
        const listaDrama = await livroService.buscarSeesaoGenero("DRAMA");
        setDRAMA(listaDrama);

        //Consultado livros de SUSPENSE
        const listaSuspense = await livroService.buscarSeesaoGenero("SUSPENSE");
        setSUSPENSE(listaSuspense);

        //Consultado livros de TERROR
        const listaTerror = await livroService.buscarSeesaoGenero("TERROR");
        setTERROR(listaTerror);

        //Consultado livros de COMEDIA
        const listaComedia = await livroService.buscarSeesaoGenero("COMEDIA");
        setCOMEDIA(listaComedia);
    }

    //Transformando um objeto Livro em LivroCard
    function criarCard(livro: Livro) {
        return (
            <LivroCard key={livro.titulo} autor={livro.nomeAutor} titulo={livro.titulo}
                urlFoto={livro.urlImagem} preco={livro.preco} comprado={livro.comprado} />
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
    async function pesquisarLivros(genero: any, titulo: string | undefined, numeroPagina: number = 0) {
        const livros = await livroService.buscarLivros(genero, titulo, numeroPagina);
        //Usando a lista de livros de romance como suporte
        setPesquisa(livros);
        setPesquisou(true);
    }

    //Exibindo o resultado da pesquisa
    function resultadoPesquisa() {
        if (!pesquisa?.lista?.length) {
            return (
                <h1 className="text-black">Not found</h1>
            )

        }
        return (
            pesquisa.lista.map(criarCard)
        )
    }

    //Pesquisando  ao clicar na lupa
    function exibirResultado(pagina: number) {
        pesquisarLivros(genero, titulo, pagina);
        window.scrollTo(0,0);
    }

    //Pesquisar ao selecionar um genero
    function pesquisarGenero(generoSelecionado: string) {
        pesquisarLivros(generoSelecionado, titulo);
    }

    // Gerando o componente de número
    function gerarNumeros(numero: number) {
        return (
            <NumeroPagina onClick={() => exibirResultado(numero - 1)}
                key={numero} numero={numero} />
        )
    }

    // Renderizando componente de paginação
    function renderizarNumeros(qtdPaginas: number | undefined) {
        const numeros = [];
        if (qtdPaginas && qtdPaginas > 1) {
            for (let i = 1; i <= qtdPaginas; i++) {
                numeros.push(i);
            }
            return (
                <div className=" flex items-center">
                    <div style={{width: '40%'}}
                    className=" m-auto  flex flex-wrap"
                    >
                        {numeros.map(gerarNumeros)}
                    </div>
                </div>

            );
        }

    }


    return (
        <Template cadastro={true} livros={true} childrenHeader={<BarraPesquisa pesquisar={() => exibirResultado(0)} onChange={event => setTitulo(event.target.value)} />}>
            {
                <>
                    <AreaFiltro onChange={selecionarGenero} />
                    <RenderIf condicao={!pesquisou}>
                        {renderizarCards()}
                    </RenderIf>
                    <RenderIf condicao={pesquisou}>
                        <LivrosPesquisa voltar={() => setPesquisou(false)}>{resultadoPesquisa()}</LivrosPesquisa>
                        {pesquisou ? renderizarNumeros(pesquisa?.qtdPaginas) : false}
                    </RenderIf>
                </>
            }
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
    onChange: (event: any) => void;
}

const AreaFiltro: React.FC<filtroProps> = ({ onChange }) => {

    const [visivel, setVisivel] = useState<string>("hidden");

    function abrirFiltro() {
        visivel === "hidden" ? setVisivel("") : setVisivel("hidden");

    }
    return (
        <section className="px-6 flex flex-col items-start  ">
            <div onClick={abrirFiltro}
                className="  hover:cursor-pointer    px-2  h-6 my-0.5 bg-gray-700   ">
                <i className="text-white   scale-75  material-icons ">tune</i>
            </div>
            <select onChange={event => onChange(event.target.value)} className={`${visivel} my-2 text-black font-mono text-sm h-6  rounded-sm px-1`}>
                <option >Todos</option>
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


