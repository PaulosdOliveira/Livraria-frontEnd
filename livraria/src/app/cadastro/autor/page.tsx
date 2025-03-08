'use client'

import { Template } from "@/components/Template"
import { formValidator, formularioAutor, valoresIniciais } from "./EsquemaFormAutor"
import { useFormik } from "formik"
import { AutorService } from "@/resources/autor/AutorService"
import { notificacao } from "@/components/notificacao/index"


export const CadastroAutor: React.FC = () => {

    const notificador = notificacao();
    const { handleChange, handleSubmit, values } = useFormik<formularioAutor>({
        initialValues: valoresIniciais,
        onSubmit: submit,
        validationSchema: formValidator
    })

    function submit(dados: formularioAutor) {
        const dadosEnviados = new FormData();
        dadosEnviados.append("nome", dados.nome);
        dadosEnviados.append("breveDescricao", dados.breveDescricao);
        dadosEnviados.append("dataNascimento", dados.dataNascimento + "");
        dadosEnviados.append("arquivo", dados.arquivo);
        AutorService().cadastrarAutor(dadosEnviados).then((resultado) => {
            console.log(resultado.status)
            if (resultado.status === 201) {
                notificador.notificar("Autor cadastrado", "success");
            } else if (resultado.status === 409) {
                console.log(resultado.erro);
                notificador.notificar(resultado.erro + "", "error");
            }
        });
    }
    return (
        <>
            <h1 className="text-black text-center mt-20  text-2xl mb-5">CADASTRO DE AUTORES</h1>
            <div className="flex ">
                <form  onSubmit={handleSubmit} className=" inline-block m-auto ">
                    <div className="text-black border  border-gray-500 p-3  rounded-md">
                        <div className=" ">
                            <input onChange={handleChange} id="nome" className="border mx-3 border-gray-400  h-11 w-80 rounded-md" type="text" placeholder="Nome do autor" />
                            <input onChange={handleChange} id="dataNascimento" className="border border-gray-400 h-11 w-52 rounded-sm" type="date" />
                        </div>
                        <div className="flex mb-4">
                            <textarea onChange={handleChange} id="breveDescricao" style={{ width: '75%' }}
                                className="border border-gray-400 ml-3 mt-2  h-36  rounded-md " placeholder="Escreva um pouco sobre ele" />
                        </div>
                        <div >
                            <label className="cursor-pointer ml-3 mr-32">
                                <div className=" inline-block bg-gray-600 rounded-lg p-2">Selecione uma foto</div>
                                <input onChange={handleChange} id="arquivo" type="file" className="sr-only" />
                            </label>
                            <input type="submit" value="Salvar"
                                className="cursor-pointer bg-blue-950 text-white rounded-md p-2"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}