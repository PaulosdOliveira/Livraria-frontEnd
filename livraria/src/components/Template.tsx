
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import { ItemLista } from "@/components/ItemLista/ItemLista";
import { UseAuth } from "@/resources/Usuarios/LoginService";
import { useRouter } from "next/navigation"


interface templateProps {
    children?: React.ReactNode;
    header?: React.ReactNode;
    livros?: boolean;
    cadastro?: boolean;
    admPage?: boolean;
    mudarCastro?: (event: any) => void
}

export const Template: React.FC<templateProps> = ({ children, header, cadastro, livros, admPage, mudarCastro }) => {

    return (
        <>
            {header}
            <main style={{ backgroundColor: '#ffff' }}>
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




export const Footer: React.FC = () => {
    return (
        <footer style={{ backgroundColor: '#9a9a89' }}
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
