'use client'

import { Input } from "@/components/InputText/Input";
import { LivroCard } from "@/components/LivroCard";
import { Template } from "@/components/Template";
import { UseAuth } from "@/resources/Usuarios/LoginService"
import { useFormik } from "formik";
import ErrorPage from "next/error"
import {notificacao} from "@/components/notificacao/index"
import { useState } from "react";
import { cadastroLivro, valoresIniciais } from "./EsquemaFormLivro"
import { AutorService } from "@/resources/autor/AutorService"
import { AutorOption } from "@/resources/autor/AutorResource"
import { UUID } from "crypto";
import { Button } from "@/components/Button/Button";
import { LivroService } from "@/resources/livro/Livro.service";


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

    const notificador = notificacao();
    const [bemVindo, setBemvindo] = useState<boolean>(true);
    const [optionAutor, setOptionAUtor] = useState<AutorOption[]>([]);
    const [urlimagem, setUrlimagem] = useState<string>("")

    const { errors, values, handleChange, handleSubmit, resetForm } = useFormik<cadastroLivro>({
        initialValues: valoresIniciais,
        onSubmit: submit,


    })

    function selecionarImagem(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const arquivo = event.target.files[0];
            values.arquivo = arquivo;
            const urlFoto = URL.createObjectURL(arquivo);
            setUrlimagem(urlFoto);
        }
    }

    //Método de consulta de optionAutorDTO
    async function buscarOptionAutor() {
        const listaOptionAutor = await AutorService().buscarOptionsAutor();
        setOptionAUtor(listaOptionAutor);
    }

    function preencherIdAutor(idAutor: UUID) {
        values.idAutor = idAutor;
    }

    function criarOption(optionDTO: AutorOption) {
        return (
            <OptionAutor key={optionDTO.id} idAutor={optionDTO.id} onClick={preencherIdAutor} nome={optionDTO.nome} />
        )
    }

    function renderizarOptonsAutores() {
        if (bemVindo) {
            buscarOptionAutor();
            setBemvindo(false)
        }
        return (
            optionAutor.map(criarOption)
        );
    }

    //Enviando formul
    function submit(dados: cadastroLivro) {
        const dadosEnviados = new FormData();
        dadosEnviados.append("titulo", dados.titulo);
        dadosEnviados.append("descricao", dados.descricao);
        dadosEnviados.append("genero", dados.generoLivro);
        dadosEnviados.append("dataString", JSON.stringify(dados.dataPublicacao));
        dadosEnviados.append("arquivo", dados.arquivo);
        dadosEnviados.append("ISBN", dados.ISBN);
        dadosEnviados.append("preco", dados.preco);
        dadosEnviados.append("idString", JSON.stringify(dados.idAutor));
        const criado = LivroService().salvarLivro(dadosEnviados);
        if (!!criado) {
            notificador.notificar("Livro salvo", "success");
            resetForm
            setUrlimagem("");
        }

    }



    return (
        <Template admPage={true}
            childrenHeader={<h1>Bom dia</h1>}>
            <>
                <section style={{ height: '90vh', width: '100vw' }}
                    className="text-black  flex flex-wrap  items-start pt-7  m-auto">
                    <div style={{ width: '520px' }}
                        className=" border border-gray-400 rounded-sm mx-10  h-auto mr-4 ">
                        <form onSubmit={handleSubmit} className="">
                            <Caixa>
                                <Input onChange={handleChange} id="titulo" placeholder="Titulo" estilo="livroForm"></Input>
                                <Input onChange={handleChange} id="ISBN" placeholder="ISBN" estilo="livroForm"></Input>
                                <Input onChange={handleChange} id="preco" placeholder="Preço" estilo="livroForm"></Input>
                                <Input onChange={handleChange} id="dataPublicacao" type="date" placeholder="Preço" estilo="livroForm"></Input>
                                <Select onChange={(event) => values.generoLivro = event.target.value}  >
                                    <option>ROMANCE</option>
                                    <option>CIENCIA</option>
                                    <option>COMEDIA</option>
                                    <option>TERROR</option>
                                    <option>SUSPENSE</option>
                                    <option>DRAMA</option>
                                </Select>
                                <Select id="opcoes">
                                    {renderizarOptonsAutores()}
                                </Select>
                            </Caixa>
                            <textarea id="descricao" onChange={handleChange} placeholder="Descrição do livro" className="border border-gray-600 ml-1 mt-2 h-32 w-72 " />
                            <label className="cursor-pointer absolute translate-x-4 translate-y-5">
                                <div className="border border-purple-700 w-44  h-10 rounded-lg text-center pt-2">
                                    Selecione Uma foto
                                    <input onChange={selecionarImagem} type="file" className="sr-only" />
                                </div>
                            </label>
                            <Button type="submit" value="Salvar" estilo="bg-gray-600 text-white px-3 py-1.5 ml-16 mb-12 cursor-pointer rounded-lg" />
                        </form>

                    </div>
                    <LivroCard urlFoto={urlimagem} autor="paulo"
                        titulo={values.titulo} preco={`${values.preco}$`} />
                    <p className="text-black">{values.ISBN + ""}</p>
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
            className="border  grid grid-cols-2 px-1 ">
            {children}
        </div>
    )
}

interface selectProps {
    children?: React.ReactNode;
    id?: string;
    onChange?: (event: any) => void;
}

const Select: React.FC<selectProps> = ({ children, id, onChange }) => {
    return (
        <>
            <select onChange={onChange} id={id} className={`my-2 text-black  text-sm h-8 mx-3 rounded-sm px-1`}>
                {children}
            </select>
        </>
    )
}


interface optionAutorPtops {
    nome: string | undefined;
    onClick: (event: any) => void;
    idAutor?: UUID;
}

/*
 Elemento responsável por gerar as opções de autores 
em um <select> 
**/
const OptionAutor: React.FC<optionAutorPtops> = ({ nome, idAutor, onClick }) => {
    return (
        <option id={idAutor} onClick={() => onClick(idAutor)}>{nome}</option>
    )
}

