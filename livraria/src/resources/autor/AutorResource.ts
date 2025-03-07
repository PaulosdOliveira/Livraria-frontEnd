import { UUID } from "crypto";

export class AutorOption {
    nome?: string;
    id?: UUID;
}

export class autorCadastro {
    nome?: string;
    breveDescricao?: string;
    dataNascimento?: Date;
    arquivor?: Blob | string;
}