import { UseAuth } from "@/resources/Usuarios/LoginService"
import {AutorOption} from "./AutorResource"

class AutorServiceClass {
    urlBase = "http://localhost:8080/autores";


    async buscarOptionsAutor (): Promise<AutorOption[]> {
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