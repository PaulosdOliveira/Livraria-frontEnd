import * as yup from 'yup'


export interface formProps {
    nome: string;
    email: string;
    senha: string;
    senhaBate: string;
}


export const ValidarForm = yup.object().shape({
    email: yup.string().trim().required("O email é obrigatório").email("Email inválido"),
    nome: yup.string().trim().required("O nome é obrigatório"),
    senha: yup.string().required("Campo obrigatório").min(3, "A senha precisa ter ao menos 3 caracters"),
    senhaBate: yup.string().oneOf([yup.ref("senha")], "Senhas não batem! ")
})

export const FormEsquema: formProps = {email: '', nome: '', senha: '', senhaBate: ''};
