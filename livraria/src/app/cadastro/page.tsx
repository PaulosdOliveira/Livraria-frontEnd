'use client'

import { Button } from "@/components/Button/Button"
import { ErroCampo } from "@/components/InputText/Erro"
import { Input } from "@/components/InputText/Input"
import { Footer } from "@/components/Template"
import { cadastroPorps, ValidarForm, Cadastro } from "./cadastroSchem"
import { useFormik } from "formik"
import { Usuario } from "@/resources/Usuarios/Usuarios.resources"
import { UseAuth } from "@/resources/Usuarios/LoginService"
import { notificacao } from "@/components/notificacao"
import { BarraPesquisa } from '@/app/biblioteca/page'
import { useState } from "react"
import { Header } from "@/components/header/Cabecalho"



export default function () {

    const notificador = notificacao();
    const auth = UseAuth();
    const [resutado, setResutado] = useState<string>("");



    const { values, errors, handleSubmit, handleChange, resetForm } = useFormik<cadastroPorps>({
        initialValues: Cadastro,
        validationSchema: ValidarForm,
        onSubmit: submit
    })

    async function submit(values: cadastroPorps) {
        try {
            const usuario: Usuario = { nome: values.nome, email: values.email, senha: values.senha }
            await auth.cadastrar(usuario).then((resposta) => {
                console.log(resposta)
                if (resposta === 201) {
                    setResutado("Conta criada")
                    window.location.replace("/login");
                } else {
                    setResutado(resposta);
                }
                notificador.notificar(resposta, "error");
            })

        } catch (error) {

        }
    }

    return (
        <>
            <main className="pt-10" style={{ height: '100vh' }}>
                <span className="text-red-600 text-center block  m-auto">{resutado}</span>
                <div className=" rounded-lg border border-gray-300 shadow-lg w-96  max-h-screen pb-5 m-auto">
                    <form onSubmit={handleSubmit} className="  w-full  " >
                        <div id="caixas">
                            <Input onChange={handleChange} value={values.nome} id="nome" placeholder="Nome" estilo={`form`} />
                            <ErroCampo erro={errors.nome} />
                            <Input onChange={handleChange} value={values.email} id="email" placeholder="Email" estilo="form" />
                            <ErroCampo erro={errors.email} />
                            <Input onChange={handleChange} value={values.senha} id="senha" type="password" placeholder="Senha" estilo="form" />
                            <ErroCampo erro={errors.senha} />
                            <Input onChange={handleChange} value={values.senhaBate} id="senhaBate" type="password" placeholder="Confirmar senha" estilo={` form`} />
                            <ErroCampo erro={errors.senhaBate} />
                        </div>
                        <hr className="border-black w-80 m-auto mt-3" />
                        <Button type="submit" value="Criar conta" estilo="bg-gray-100  text-center  text-black  py-1.5 w-80 h-10 mt-3 ml-8 rounded-full hover:cursor-pointer" />
                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}