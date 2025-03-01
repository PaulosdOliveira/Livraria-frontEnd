
import { useState } from "react"
import { ItemLista } from "@/components/ItemLista/ItemLista";
import { UseAuth } from "@/resources/Usuarios/LoginService";
import { useRouter } from "next/navigation"




interface templateProps {
    children?: React.ReactNode;
    childrenHeader?: React.ReactNode;

}

export const Template: React.FC<templateProps> = ({ children, childrenHeader }) => {
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
        <>
            <header className="shadow-lg border border-gray-200 my-1 ">
                <h1 className=" text-black hidden   font-bold text-left red">Bom dia</h1>
                {childrenHeader}
                <div className="  flex flex-row-reverse">
                    <Menu />
                </div>
            </header>
            {children}
            <Footer />
        </>
    )
}



interface mainProps {
    children: React.ReactNode;
}



const Menu: React.FC = () => {

    const [estiloMenu, setEstiloMenu] = useState<string>(' opacity-0');
    const [icone, setIcone] = useState<boolean>(false);
    const autenticado = UseAuth();
    const router = useRouter();

    function abriMenu() {
        if (icone == true) {
            setIcone(false);
            setEstiloMenu(" opacity-0")
        } else {
            setIcone(true);
            setEstiloMenu("opacity-full")
        }

    }

    function deslogar() {
        const usuario = autenticado.getSessaoUsuario();
        if (usuario) {
            autenticado.deslogar();
            router.push("/login");
        } else {
            router.push("/login");
        }
    }


    return (
        <div className=" flex flex-col items-end z-50">
            <i onClick={abriMenu} className=" material-icons hover:cursor-pointer -my-2  text-black menu">more_vert</i>
            <div className={` ${estiloMenu} transition-all duration-500 max-h-screen  bg-slate-50 m-0 border border-gray-300  mt-1.5`}>
                <ul className={`text-center font-serif `}>
                    <ItemLista texto="Meus livros" />
                    <ItemLista onClick={deslogar} texto="Sair" />
                </ul>
            </div>
        </div>
    )
}

export const Footer: React.FC = () => {
    return (
        <footer className=" absolute w-full  py-5 border border-gray-50  bg-gray-300 ">
            <p className="text-gray-700 text-center ">Desenvolvido por Paulo Oliveira</p>
        </footer>
    )
}

interface RenderIfProps {
    condicao?: boolean;
    children?: React.ReactNode;
}

export const RenderIf: React.FC<RenderIfProps> = ({ children, condicao }) => {
    if (condicao) {
        return children
    }
    return false;
}
