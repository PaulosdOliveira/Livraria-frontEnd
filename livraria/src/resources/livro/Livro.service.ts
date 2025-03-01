import { UseAuth } from '../Usuarios/LoginService';
import { Livro } from './Livro.resource'


class UseLivroService {
    urlBase = "http://localhost:8080/livros";

    async buscarLivroPorGenero(genero: "DRAMA" | "ROMANCE" | "CIENCIA" | "TERROR" | "COMEDIA" | "SUSPENSE") : Promise<Livro[]> {
        const url = this.urlBase + "?genero=" + genero;
        const usuarioLogado = UseAuth().getSessaoUsuario();
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${usuarioLogado?.accessToken}`
            }
        });
        return await response.json();
        
    }
}

export const LivroService = () => new UseLivroService();