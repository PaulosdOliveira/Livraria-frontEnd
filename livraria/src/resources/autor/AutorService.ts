import { UseAuth } from "@/resources/Usuarios/LoginService"
import { AutorOption } from "./AutorResource"

interface resultado {
    status: number;
    erro?: string;
}

class AutorServiceClass {
    urlBase = "http://localhost:8080/autores";


    async cadastrarAutor(dados: FormData) {
        const usuarioLogado = UseAuth().getSessaoUsuario();
        const resposta = await fetch(this.urlBase, {
            method: "POST",
            body: dados,
            headers: {
                "Authorization": `Bearer ${usuarioLogado?.accessToken}`
            }
        })

        const status = resposta.status;
        const resultado: resultado = { status: status, erro: "SEm erro" };
        if (status === 409) {
            const erroMensagem = await resposta.json();
            resultado.erro = erroMensagem.erro;
        }
        return resultado;
    }



    async buscarOptionsAutor(): Promise<AutorOption[]> {
        const url = this.urlBase + "/nomes";
        const usuarioLogado = UseAuth().getSessaoUsuario();
        const resposta = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${usuarioLogado?.accessToken}`
            }

        });
        return resposta.json();
    }
}

export const AutorService = () => new AutorServiceClass();