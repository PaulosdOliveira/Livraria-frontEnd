'use client'


import { Input } from "@/components/InputText/Input";
import { LivroCard } from "@/components/LivroCard";
import { useFormik } from "formik";
import { notificacao } from "@/components/notificacao/index"
import { useState } from "react";
import { cadastroLivro, valoresIniciais, validarDados } from "./FormLivroEsquema";
import { AutorService } from "@/resources/autor/AutorService"
import { AutorOption } from "@/resources/autor/AutorResource"
import { UUID } from "crypto";
import { Button } from "@/components/Button/Button";
import { LivroService } from "@/resources/livro/Livro.service";
import { OptionGenero } from "@/components/OptionGenero";

export const FormLivro: React.FC = () => {

    const notificador = notificacao();
    const [bemVindo, setBemvindo] = useState<boolean>(true);
    const [optionAutor, setOptionAUtor] = useState<AutorOption[]>([]);
    const [urlimagem, setUrlimagem] = useState<string>()
    const livroService = LivroService();

    const { errors, values, handleChange, handleSubmit, resetForm } = useFormik<cadastroLivro>({
        initialValues: valoresIniciais,
        onSubmit: submit,
        validationSchema: validarDados
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

    // Limpar formulário
    function limparForm() {
        values.ISBN = "";
        values.preco = "";
        values.descricao = "";
        values.titulo = "";
    }

    //Enviando formulário
    async function submit(dados: cadastroLivro) {
        const dadosEnviados = new FormData();
        dadosEnviados.append("titulo", dados.titulo);
        dadosEnviados.append("descricao", dados.descricao);
        dadosEnviados.append("genero", dados.generoLivro);
        dadosEnviados.append("dataString", JSON.stringify(dados.dataPublicacao));
        dadosEnviados.append("arquivo", dados.arquivo);
        dadosEnviados.append("ISBN", dados.ISBN);
        dadosEnviados.append("preco", dados.preco.replace(",", "."));
        dadosEnviados.append("idString", JSON.stringify(dados.idAutor));

        // Enviando a requisção e tratando os diferentes resultados
        livroService.salvarLivro(dadosEnviados).then((resposta) => {
            if (resposta.status === 409) {
                notificador.notificar(resposta.erro + "", "warning");
            } else {
                notificador.notificar("Livro salvo", "success");
                limparForm();
                setUrlimagem("");
                dadosEnviados.append("arquivo", "");
            }
        });
    }

    return (

        <>
            <h1 className="text-black text-2xl px-44 mt-9 ">Cadastro de livros</h1>
                <div className="flex items-center flex-wrap text-gray-700">
                    <div style={{ width: '520px' }}
                        className=" border border-gray-400 rounded-sm h-auto mx-9  ">
                        <form onSubmit={handleSubmit} className="">
                            <Caixa>
                                <Input onChange={handleChange} value={values.titulo} id="titulo" placeholder="Titulo" estilo="livroForm"></Input>
                                <Input onChange={handleChange} value={values.ISBN} id="ISBN" placeholder="ISBN" estilo="livroForm"></Input>
                                <input onChange={handleChange} value={values.preco} id="preco" placeholder="Preço" className="livroForm" />
                                <Input onChange={handleChange} id="dataPublicacao" type="date" placeholder="Preço" estilo="livroForm" />
                                <Select onChange={(event) => values.generoLivro = event.target.value}  >
                                    <OptionGenero />
                                </Select>
                                <Select id="opcoes" >
                                    <option>Autor</option>
                                    {renderizarOptonsAutores()}
                                </Select>
                            </Caixa>
                            <textarea value={values.descricao} id="descricao" onChange={handleChange} placeholder="Descrição do livro" className="border border-gray-600 ml-1 mt-2 h-32 w-72 " />
                            <label className="cursor-pointer absolute translate-x-4 translate-y-5">
                                <div className="border border-purple-700 w-44  h-10 rounded-lg text-center pt-2">
                                    Selecione Uma foto
                                    <input onChange={selecionarImagem} type="file" className="sr-only" />
                                </div>
                            </label>
                            <Button type="submit" value="Salvar" estilo="bg-gray-600 text-white px-3 py-1.5 ml-16 mb-12 cursor-pointer rounded-lg" />
                        </form>
                    </div>
                    <LivroCard urlFoto={urlimagem}
                      titulo={values.titulo} preco={`${values.preco}$`}/>
                </div>
        
        </>
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



