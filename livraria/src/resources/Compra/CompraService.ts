
import { UseAuth } from "@/resources/Usuarios/LoginService"

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
        return resposta;

    }

}


export const CompraService = () => new Compra();