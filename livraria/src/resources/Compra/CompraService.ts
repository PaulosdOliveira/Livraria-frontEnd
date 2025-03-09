
import { UseAuth } from "@/resources/Usuarios/LoginService"




interface resposta {
    status: number;
    erro: string;
}

class Compra {

    urlBase = "http://localhost:8080/compras";


    async compraLivro(tituloLivro: string) {
        const url = this.urlBase + "/" + tituloLivro;
        const usuarioLogado = UseAuth().getSessaoUsuario();
        const resposta = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${usuarioLogado?.accessToken}`
            }
        })

        const status = resposta.status;
        const resultado: resposta = { erro: "", status: status };

        if (status === 409) {
            const erro = await resposta.json();
            resultado.erro = erro.erro;
        }



        return resultado;

    }

}


export const CompraService = () => new Compra();