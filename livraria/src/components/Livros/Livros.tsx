'use client'

import { LivroCard } from "@/components/LivroCard";
import { useState } from "react";

interface livroSection {
    genero?: string;
}

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

export const LivrosGenero: React.FC = () => {

    return (
        <section className="border bg-white shadow-xl shadow-gray-200 h-80 my-10 ">
            <div className="bg-pink-600 mb-1 w-24 my-1 rounded-e-full">
                <h1 className="text-white shadow-md shadow-gray-500">CIÊNCIA</h1>
            </div>
            <section id="prateleira" className=" flex h-64">
                <div ><LivroCard /></div>
                <div><LivroCard /></div>
                <div><LivroCard /></div>
                <div><LivroCard /></div>
            </section>
        </section>
    )
}

export const LivrosPesquisa: React.FC = () => {
    return (
        <section id="sessao-pesquisa" className="bg-white ">

                <div className="test"><LivroCard /></div>
                <div className="test"><LivroCard /></div>
                <div className="test"><LivroCard /></div>
                <div className="test"><LivroCard /></div>
                <div className="test"><LivroCard /></div>
                <div className="test"><LivroCard /></div>
                <div className="test"><LivroCard /></div>
                <div className="test"><LivroCard /></div>
                <div className="test"><LivroCard /></div>
            

        </section>
    )
}



