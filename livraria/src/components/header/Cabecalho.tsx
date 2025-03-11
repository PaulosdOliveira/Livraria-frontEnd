'use client'

import { ItemLista } from "../ItemLista/ItemLista"
import { RenderIf } from "../Template"
import { useState } from "react"
import { UseAuth } from "@/resources/Usuarios/LoginService"


interface headerProps {
    barraPesquisa?: React.ReactNode;
    home?: (event: any) => void
}

export const Header: React.FC<headerProps> = ({ barraPesquisa, home }) => {

    const [opacidadeMenu, setOpacidadeMenu] = useState<string>('opacity-0');
    const estiloParagrafo = " cursor-pointer hover:underline inline-block mx-4";
    const estiloImg = " mx-1  h-6 w-6 cursor-pointer";

    function mostrarMenu() {
        if (opacidadeMenu === "opacity-full") {
            setOpacidadeMenu("opacity-0")
        } else {
            setOpacidadeMenu("opacity-full")
        }
    }

    return (
        <>
            <header style={{ height: '16vh', width: '98vw' }}
                className="text-black border m-auto flex  rounded-lg mt-2 border-gray-500">
                <img style={{}}
                    className="w-20 h-20 m-auto " src="https://cdn4.iconfinder.com/data/icons/logo-brand/512/z4-finder_mac_brand_logo-512.png" alt="" />
                <div style={{ width: '80%', height: '100%' }}
                    className=" pt-9 inline-block ">
                    <div className="flex flex-row-reverse  items-end  ">
                        <div className="grid grid-cols-3 pr-8 ml-3 ">
                            <img className={estiloImg} src="https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Instagram_svg-1024.png" alt="" />
                            <img className={estiloImg} src="https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Linkedin_svg-1024.png" alt="" />
                            <img className={estiloImg} src="https://cdn1.iconfinder.com/data/icons/picons-social/57/github_rounded-1024.png" alt="" />
                        </div>
                        {barraPesquisa}
                    </div>
                    <div className="flex flex-row-reverse  mt-4">
                        <i onClick={mostrarMenu} className="material-icons cursor-pointer">more_vert</i>
                        <p className={estiloParagrafo}>Contato</p>
                        <a href="/meuslivros" className={estiloParagrafo}>Comprados</a>
                        <p onClick={home} className={estiloParagrafo}>Home</p>
                    </div>
                </div>

            </header >
            <div className="block max-h-screen">
                <Menu opacidade={opacidadeMenu} />
            </div>
        </>
    )
}


interface menuProps {
    livros?: boolean;
    cadastro?: boolean;
    admPage?: boolean;
    mudarCastro?: (event: any) => void
    opacidade?: string
}


const Menu: React.FC<menuProps> = ({ cadastro, livros, admPage, mudarCastro, opacidade }) => {

    const [cadastriLivro, setCadastriLivro] = useState<string>("Autores");
    const autenticado = UseAuth();

    const perfil = autenticado.getSessaoUsuario()?.perfil;



    function deslogar() {
        const usuario = autenticado.getSessaoUsuario();
        if (usuario) {
            autenticado.deslogar();
            window.location.replace('/login');
        } else {
            window.location.replace('/login');
        }
    }

    function mudarTextoCadastro() {
        if (cadastriLivro === "Autores") {
            setCadastriLivro("Livros");
        } else {
            setCadastriLivro("Autores");
        }
    }

    return (
        <div className=" flex flex-col items-end z-50   mr-2">
            <div className={` ${opacidade}  transition-all duration-500 max-h-screen  bg-slate-50 m-0 border border-gray-300  mt-1.5`}>
                <ul className={`text-center font-serif `}>
                    <RenderIf condicao={perfil !== "ADMNISTRADOR" && livros}>
                        <ItemLista texto="Meus livros" />
                    </RenderIf>
                    <RenderIf condicao={perfil === "ADMNISTRADOR" && cadastro}>
                        <ItemLista onClick={() => window.location.replace("/unidadeADM")} texto="Cadastro" />
                    </RenderIf>
                    <RenderIf condicao={admPage}>
                        <div onClick={mudarTextoCadastro}>
                            <ItemLista onClick={mudarCastro} texto={cadastriLivro} />
                        </div>
                    </RenderIf>
                    <ItemLista onClick={deslogar} texto="Sair" />
                </ul>
            </div>
        </div>
    )
}