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
        <section className="border bg-white w-auto shadow-xl shadow-gray-200 h-96 my-10  ml-6">
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
    children?: React.ReactNode;
}
export const LivrosPesquisa: React.FC<pesquisaPorps> = ({ children }) => {
    return (
        <section className="  items-start bg-gray-200   m-auto"
            style={{ minHeight: '96vh', maxHeight: 'auto', width: '98%' }}
        >
            <div style={{ width: '85%' ,height: 'auto'}}
             className="flex flex-wrap     m-auto ">
                <LivroCard autor="paulo" titulo="Livro" urlFoto="https://static.wixstatic.com/media/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg/v1/fill/w_480,h_768,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg" />
                <LivroCard autor="paulo" titulo="Livro" urlFoto="https://static.wixstatic.com/media/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg/v1/fill/w_480,h_768,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg" />
                <LivroCard autor="paulo" titulo="Livro" urlFoto="https://static.wixstatic.com/media/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg/v1/fill/w_480,h_768,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg" />
                <LivroCard autor="paulo" titulo="Livro" urlFoto="https://static.wixstatic.com/media/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg/v1/fill/w_480,h_768,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg" />
                <LivroCard autor="paulo" titulo="Livro" urlFoto="https://static.wixstatic.com/media/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg/v1/fill/w_480,h_768,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg" />
                <LivroCard autor="paulo" titulo="Livro" urlFoto="https://static.wixstatic.com/media/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg/v1/fill/w_480,h_768,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/31a549_7dffb191bffa440686e5a148b8e042d9~mv2.jpg" />
            </div>
            {children}
        </section>
    )
}



