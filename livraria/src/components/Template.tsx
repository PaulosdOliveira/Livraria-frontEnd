
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import { ItemLista } from "@/components/ItemLista/ItemLista";
import { UseAuth } from "@/resources/Usuarios/LoginService";
import { useRouter } from "next/navigation"


interface templateProps {
    children?: React.ReactNode;
    childrenHeader?: React.ReactNode;
    livros?: boolean;
    cadastro?: boolean;
    admPage?: boolean;
    mudarCastro?: (event: any) => void
}

export const Template: React.FC<templateProps> = ({ children, childrenHeader, cadastro, livros, admPage, mudarCastro }) => {

    return (
        <>
            <header className="shadow-sm   ">
                <h1 style={{ fontFamily: 'logo' }}
                    className="text-black text-center font-normal text-4xl">Livraria</h1>
                {childrenHeader}
                <div className="   flex flex-row-reverse">
                    <Menu admPage={admPage} cadastro={cadastro}
                        livros={livros} mudarCastro={mudarCastro} />
                </div>
            </header>
            <main style={{backgroundColor: '#ffff'}}>
                {children}
            </main>
            <Footer />
            <ToastContainer position="top-center"
                autoClose={6000}
                hideProgressBar={false}
                draggable={false}
                closeOnClick={true}
                pauseOnHover={true}
            />
        </>
    )
}


interface menuProps {
    livros?: boolean;
    cadastro?: boolean;
    admPage?: boolean;
    mudarCastro?: (event: any) => void
}



const Menu: React.FC<menuProps> = ({ cadastro, livros, admPage, mudarCastro }) => {

    const [cadastriLivro, setCadastriLivro] = useState<string>("Autores");
    const [estiloMenu, setEstiloMenu] = useState<string>(' opacity-0');
    const [icone, setIcone] = useState<boolean>(false);
    const autenticado = UseAuth();
    const router = useRouter();
    const perfil = autenticado.getSessaoUsuario()?.perfil;

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

    function mudarTextoCadastro() {
        if (cadastriLivro === "Autores") {
            setCadastriLivro("Livros");
        } else {
            setCadastriLivro("Autores");
        }
    }

    return (
        <div className=" flex flex-col items-end z-50 absolute  mr-5">
            <i onClick={abriMenu} className=" material-icons hover:cursor-pointer -my-2  text-black menu">more_vert</i>
            <div className={` ${estiloMenu} transition-all duration-500 max-h-screen  bg-slate-50 m-0 border border-gray-300  mt-1.5`}>
                <ul className={`text-center font-serif `}>
                    <RenderIf condicao={perfil !== "ADMNISTRADOR" && livros}>
                        <ItemLista texto="Meus livros" />
                    </RenderIf>
                    <RenderIf condicao={perfil === "ADMNISTRADOR" && cadastro}>
                        <ItemLista onClick={() => router.push("/unidadeADM")} texto="Cadastro" />
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

export const Footer: React.FC = () => {
    return (
        <footer style={{backgroundColor: '#9a9a89'}}
        className=" absolute w-full  py-5 border border-gray-50  ">
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
