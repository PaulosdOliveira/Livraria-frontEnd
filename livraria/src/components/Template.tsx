'use client'

import { useState } from "react"
import { ItemLista } from "@/components/ItemLista/ItemLista";
import { LivrosGenero, LivrosPesquisa, Principal } from "@/components/Livros/Livros"



export default function Template() {


    const [children, setChildren] = useState<React.ReactNode>(<LivrosPesquisa/>);
    const [inicio, setInicio] = useState<boolean>(true);

    function mudar() {
        if (inicio) {
            setInicio(false);
            setChildren(<LivrosPesquisa />);
        } else {
            setInicio(true);
            setChildren(<LivrosGenero />);
        }
    }

    return (
        <>
            <Header />
            <Main >
                <section className="px-6 flex  mb-12 ">
                    <div className=" hover:cursor-pointer  px-2  h-6 my-0.5 bg-gray-200   ">
                        <i className="text-gray-600 border  scale-75  material-icons ">tune</i>
                    </div>
                </section>
                <Principal>
                    {children}
                </Principal>
            </Main>
            <Footer />
        </>
    )
}

const Header: React.FC = () => {
    return (
        <header className="shadow-lg border border-gray-200 my-1 ">
            <h1 className="inline-block text-black border  font-bold text-left red">Bom dia</h1>
            <div className="inputHeader m-auto ">
                <h2 className="text-black">Pesquisar</h2>
                <div className=" pl-0.5  rounded-e-xl rounded-s-sm flex  max-w-80 m-auto  border border-gray-300 bg-gray-200 ">
                    <input type="text" placeholder="Pesquisar" className="h-10   size-full border  text-black  rounded-lg inputHeader" />
                    <div className=" ml-0.5 hover:cursor-pointer rounded-e-xl  w-12 h-auto bg-black">
                        <i className=" my-3  w-auto h-auto material-icons  text-white  scale-150">search</i>
                    </div>
                </div>
            </div>
            <div className="  flex flex-row-reverse">
                <Menu />
            </div>
        </header>
    )
}

interface mainProps {
    children: React.ReactNode;
}

const Main: React.FC<mainProps> = ({ children }) => {
    return (
        <main className=" bg-gray-100 border">
            {children}
        </main>
    )
}

const Menu: React.FC = () => {

    const [estiloMenu, setEstiloMenu] = useState<string>('translate-x-full opacity-0');
    const [icone, setIcone] = useState<boolean>(false);

    function abriMenu() {
        if (icone == true) {
            setIcone(false);
            setEstiloMenu("translate-x-full opacity-0")
        } else {
            setIcone(true);
            setEstiloMenu("opacity-full")
        }

    }

    return (
        <div className=" flex flex-col items-end">
            <i onClick={abriMenu} className=" material-icons hover:cursor-pointer   text-black menu">more_vert</i>
            <div className={` ${estiloMenu} max-h-screen transition-all duration-1000 bg-slate-50 m-0 border border-gray-300  mt-1.5`}>
                <i onClick={abriMenu} className={` material-icons text-gray-700 hover:cursor-pointer ml-20 `}></i>
                <ul className={`text-center font-serif `}>
                    <ItemLista texto="Meus livros" />
                    <ItemLista texto="Sair" />
                </ul>
            </div>
        </div>

    )
}

const Footer: React.FC = () => {
    return (
        <footer className=" py-5 border border-gray-50 mt-12 bg-red-300">
            <p className="text-gray-700 text-center ">Desenvolvido por Paulo Oliveiras</p>
        </footer>
    )
}