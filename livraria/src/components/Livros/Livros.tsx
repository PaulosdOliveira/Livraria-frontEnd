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
        <>
            <div className={`${corGenero} mb-1 w-24 absolute  translate-y-16 translate-x-4  rounded-e-full`} >
                <h1 className="text-white  rounded-e-full shadow-md shadow-gray-500">{genero}</h1>
            </div>
            <section id="sessaoGenero" className=" bg-gray-50 w-auto  shadow-gray-200 min-h-72 py-4  mt-24   overflow-auto">
                <div className="flex items-start">
                    {children}
                </div>
            </section>
        </>
    )
}


interface pesquisaPorps {
    children: React.ReactNode;
    voltar?: (event: any) => void
}
export const LivrosPesquisa: React.FC<pesquisaPorps> = ({ children, voltar }) => {
    return (
        <section className=" flex items-center    "
            style={{ minHeight: '96vh', maxHeight: 'auto', width: 'auto' }}
        >
            <div id="gridPesquisa" style={{ width: 'auto', height: 'auto' }}
                className="  grid grid-cols-2   m-auto ">
                {children}
                <div onClick={voltar} className="text-white text-center pt-1 material-icons bg-black z-50 absolute -translate-x-12 mt-1 rounded-full h-8 w-8 hover:cursor-pointer hover:-translate-y-0.5  transition duration-700">home</div>
            </div>
        </section>
    )
}



