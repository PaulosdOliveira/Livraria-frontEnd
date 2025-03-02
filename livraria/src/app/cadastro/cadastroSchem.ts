import * as yup from 'yup'


export interface cadastroPorps {
    nome: string ;
    email: string;
    senha: string;
    senhaBate: string;
}

export const ValidarForm = yup.object().shape({
    nome: yup.string().trim().required("Campo obrigatório"),
    email: yup.string().trim().required("Campo obrigatório").email("Email inválido"),
    senha: yup.string().trim().required("Campo obrigatório").min(3, "A senha precisa ter pelo menos 3 caracters"),
    senhaBate: yup.string().oneOf([yup.ref("senha")], "As senhas nao batem")
})

export const Cadastro: cadastroPorps = {email: '', nome: '', senha: '', senhaBate: ''};