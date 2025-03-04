import { UUID } from "crypto";

export interface cadastroLivro{
    titulo: string;
    descricao: string;
    ISBN: string;
    preco: string;
    dataPublicacao?: Date;
    generoLivro: string;
    arquivo: string | Blob;
    idAutor: UUID | undefined;
}

export const valoresIniciais: cadastroLivro = { generoLivro: "ROMANCE", ISBN: "", preco: "", titulo: "", descricao: "", arquivo: "", idAutor: undefined }