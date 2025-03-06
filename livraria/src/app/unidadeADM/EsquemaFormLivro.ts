import { UUID } from "crypto";
import * as yup from "yup";

export interface cadastroLivro {
    titulo: string;
    descricao: string;
    ISBN: string;
    preco: string;
    dataPublicacao?: Date;
    generoLivro: string;
    arquivo: string | Blob;
    idAutor: UUID | undefined;
}


export const validarDados = yup.object().shape({
    titulo: yup.string().trim().required(),
    descricao: yup.string().trim().required(),
    ISBN: yup.string().trim().required(),
    preco: yup.string().required(),
    generoLivro: yup.string().trim().required(),
    arquivo: yup.mixed<Blob>().required(),
    dataPublicacao: yup.date().required()
})

export const valoresIniciais: cadastroLivro = { generoLivro: "ROMANCE", ISBN: "", preco: "", titulo: "", descricao: "", arquivo: "", idAutor: undefined }