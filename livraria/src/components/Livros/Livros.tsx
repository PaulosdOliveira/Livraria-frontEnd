'use client'

import { LivroCard } from "@/components/LivroCard";
import { useState } from "react";


interface PrincipalComponente {
    children?: React.ReactNode;
}




export const Principal: React.FC<PrincipalComponente> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

interface sessaoGeneroProps {
    genero?: "DRAMA" | "ROMANCE" | "CIENCIA" | "TERROR" | "COMEDIA" | "SUSPENSE";
    corGenero?: string;
    children?: React.ReactNode;
}

export const SessaoGenero: React.FC<sessaoGeneroProps> = ({ corGenero, genero, children }) => {
    return (
        <section className="border bg-white w-auto shadow-xl shadow-gray-200 h-96 my-10  ml-6 overflow-auto">
            <div className={`${corGenero} mb-1 w-24 my-1 rounded-e-full`} >
                <h1 className="text-white shadow-md shadow-gray-500">{genero}</h1>
            </div>
            <div className="flex ">
                {children}
            </div>
        </section>
    )
}


interface pesquisaPorps {
    children: React.ReactNode;
    voltar?: (event: any) => void
}
export const LivrosPesquisa: React.FC<pesquisaPorps> = ({ children, voltar }) => {
    return (
        <section className="  items-start bg-gray-200   m-auto"
            style={{ minHeight: '96vh', maxHeight: 'auto', width: '98%' }}
        >
            <div style={{ width: '85%', height: 'auto' }}
                className="flex flex-wrap     m-auto ">
                {children}
                <div onClick={voltar}  className="text-white text-center pt-1 material-icons bg-black z-50 absolute -translate-x-12 mt-1 rounded-full h-8 w-8 hover:cursor-pointer hover:-translate-y-0.5  transition duration-700">home</div>
            </div>
        </section>
    )
}



