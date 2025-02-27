'use client'

import { Button } from "@/components/Button/Button";
import { Input } from "@/components/InputText/Input";
import { Footer } from "@/components/Template";
import { useState } from "react";





export default function Login() {

    const [caixaVisivel, setCaixaVisivel] = useState<string>("hidden");
    const [cancelar, setCancelar] = useState<string>("Criar conta");
    const [entrar, setEntrar] = useState<string>("Entrar");


    function criarConta() {
        if (caixaVisivel == "hidden") {
            setCaixaVisivel("");
            setCancelar("Cancelar");
            setEntrar("Criar");
        } else {
            setCaixaVisivel("hidden");
            setCancelar("Criar conta");
            setEntrar("Entrar");
        }
    }

    return (
        <main className="pt-10 ">
            <div className=" rounded-lg border border-gray-300 shadow-lg w-96 h-96 m-auto">
                <form className="  w-full h-full " action="">
                    <div id="caixas">
                        <Input  placeholder="Nome" estilo={`${caixaVisivel} form`} />
                        <Input  placeholder="Email" estilo="form" />
                        <Input  type="password" placeholder="Senha" estilo="form" />
                        <Input  type="password" placeholder="Confirmar senha" estilo={`${caixaVisivel} form`} />
                        <Button value={entrar} estilo="bg-white border  text-black  w-80 h-10 mt-3 rounded-full hover:cursor-pointer"/>
                    </div>
                    <hr className="border-black w-80 m-auto mt-3" />
                    <Button onclick={criarConta} value={cancelar} estilo="bg-gray-100  text-center  text-black  py-1.5 w-80 h-10 mt-3 ml-8 rounded-full hover:cursor-pointer"/>
                </form>
            </div>
            <Footer />
        </main>
    );
}