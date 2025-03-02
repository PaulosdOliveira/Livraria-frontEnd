'use client'

import { Input } from "@/components/InputText/Input";
import { LivroCard } from "@/components/LivroCard";
import { Template } from "@/components/Template";
import { UseAuth } from "@/resources/Usuarios/LoginService"
import ErrorPage from "next/error"



export default function UnidadeADM() {


    const perfil = UseAuth().getSessaoUsuario()?.perfil;

    if (perfil === "ADMNISTRADOR") {
        console.log(perfil)
        return (
            <>
                <PaginaADM />
            </>
        )
    }

    return (
        <>
            <ErrorPage statusCode={404} />
        </>
    )
}


const PaginaADM: React.FC = () => {
    return (
        <Template admPage={true}
            childrenHeader={<h1>Bom dia</h1>}>
            <>
                <section style={{ height: '90vh' }}
                    className="text-black border pt-20 flex items-start border-red-400">
                    <div style={{ width: '50%' }}
                        className=" border border-black ml-5  h-auto mr-4 ">
                        <form className="">
                            <Caixa>
                                <Input id="" placeholder="Titulo" estilo="livroForm"></Input>
                                <Input id="" placeholder="ISBN" estilo="livroForm"></Input>
                                <Input id="" placeholder="Preço" estilo="livroForm"></Input>
                                <Input id="" type="date" placeholder="Preço" estilo="livroForm"></Input>
                                <Select />
                            </Caixa>
                            <textarea placeholder="Descrição do livro" className="border border-gray-600 ml-6 mt-2 h-32 w-72 "></textarea>

                            <br />
                            <Input id="" placeholder="Autor" estilo="livroForm"></Input>
                        </form>
                    </div>
                    <LivroCard autor="Paulo Oliveira"  titulo="Oliveira" preco="29,99$"/>
                </section>

            </>
        </Template>
    )
}

interface caixaProps {
    children?: React.ReactNode;
}

const Caixa: React.FC<caixaProps> = ({ children }) => {
    return (
        <div
            className="border flex flex-wrap px-1 ">
            {children}
        </div>
    )
}


const Select: React.FC = () => {
    return (
        <>
            <select className={`my-2 text-black  text-sm h-8  rounded-sm px-1`}>
                <option>ROMANCE</option>
                <option>CIENCIA</option>
                <option>COMEDIA</option>
                <option>TERROR</option>
                <option>SUSPENSE</option>
                <option>DRAMA</option>
            </select>
        </>
    )
}
