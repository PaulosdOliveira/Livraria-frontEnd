import * as yup from 'yup'


export interface formProps {
    email: string;
    senha: string;
}


export const ValidarForm = yup.object().shape({
    email: yup.string().trim().required("Digite o seu email").email("Email inválido"),
    senha: yup.string().required("Digite sua senha")
})

export const FormEsquema: formProps = {email: '',senha: ''};
