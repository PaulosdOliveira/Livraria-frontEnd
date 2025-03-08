'use client'

import { Template } from "@/components/Template";
import { UseAuth } from "@/resources/Usuarios/LoginService"
import { FormLivro } from "@/app/cadastro/livro/FormLivro"
import ErrorPage from "next/error"
import { useState } from "react";
import { CadastroAutor } from "@/app/cadastro/autor/page"


export default function UnidadeADM() {

    const perfil = UseAuth().getSessaoUsuario()?.perfil;
    const [cadastroLivro, setCadastroLivro] = useState<boolean>(true);
    const [children, setChildren] = useState<React.ReactNode>(<FormLivro />);

    function paginaCadastro() {
        if (cadastroLivro) {
            setCadastroLivro(false);
            setChildren(<CadastroAutor />);
        } else {
            setChildren(<FormLivro />);
            setCadastroLivro(true);
        }
    }


    if (perfil === "ADMNISTRADOR") {
        return (
            <>
                <Template admPage={true} mudarCastro={paginaCadastro} >
                    {children}
                </Template>
            </>
        )

    }

    return (
        <>
            <ErrorPage statusCode={404} />
        </>
    )
}


