'use client'

import { Button } from "@/components/Button/Button";
import { Input } from "@/components/InputText/Input";
import { ErroCampo } from "@/components/InputText/Erro";
import { Footer, RenderIf } from "@/components/Template"; import { useState } from "react";
import { useFormik } from 'formik'
import { FormEsquema, ValidarForm, formProps } from '@/app/login/FormSchem'
import { AccessToken, Credenciais, Usuario } from '@/resources/Usuarios/Usuarios.resources'
import { UseAuth } from '@/resources/Usuarios/LoginService'
import { useRouter } from 'next/navigation'



export default function Login() {

    const auth = UseAuth();
    const router = useRouter();

    const { values, errors, handleSubmit, handleChange, resetForm } = useFormik<formProps>({
        initialValues: FormEsquema,
        validationSchema: ValidarForm,
        onSubmit: onSubmit

    });


    async function onSubmit(values: formProps) {

        try {
            const credenciais: Credenciais = { email: values.email, senha: values.senha }
            const accessToken: AccessToken = await auth.logar(credenciais);
            auth.criarSessao(accessToken);
            router.push("/biblioteca");
        } catch (erro: any) {

        }
    }



    return (
        <>
            <main className="pt-10" style={{ height: '100vh' }}>
                <div className=" rounded-lg border border-gray-300 shadow-lg w-96 h-96 m-auto">
                    <form onSubmit={handleSubmit} className="  w-full h-full " >
                        <div id="caixas">
                            <Input onChange={handleChange} value={values.email} id="email" placeholder="Email" estilo="form" />
                            <ErroCampo erro={errors.email} />
                            <Input onChange={handleChange} value={values.senha} id="senha" type="password" placeholder="Senha" estilo="form" />
                            <ErroCampo erro={errors.senha} />
                            <Button type="submit" value="Entrar" estilo="bg-white border  text-black  w-80 h-10 mt-3 rounded-full hover:cursor-pointer" />
                        </div>
                        <hr className="border-black w-80 m-auto mt-3" />
                        <Button type="button" value="Criar conta" estilo="bg-gray-100  text-center  text-black  py-1.5 w-80 h-10 mt-3 ml-8 rounded-full hover:cursor-pointer" />
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}