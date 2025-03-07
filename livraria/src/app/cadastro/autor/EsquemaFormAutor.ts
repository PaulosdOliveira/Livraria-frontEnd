import * as yup from 'yup';



export interface formularioAutor{
    nome: string ;
    dataNascimento: Date;
    breveDescricao: string;
    arquivo: Blob | string;
}

export const formValidator = yup.object().shape({
    nome: yup.string().trim().required(),
    breveDescricao: yup.string().trim().required(),
    dataNascimento: yup.date().required(),
    arquivo: yup.mixed<Blob>().required()
})

export const valoresIniciais: formularioAutor = { arquivo: "", breveDescricao: "", dataNascimento: new Date(), nome: ""}