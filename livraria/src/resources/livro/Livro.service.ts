import { UseAuth } from '../Usuarios/LoginService';
import { Livro } from './Livro.resource'


class UseLivroService {
    urlBase = "http://localhost:8080/livros";


    //Metodo para buscar livros por genero e/ou titulo
    async buscarLivros(genero: "DRAMA" | "ROMANCE" | "CIENCIA" | "TERROR" | "COMEDIA" | "SUSPENSE" | undefined, titulo: string | undefined) : Promise<Livro[]> {
        const url = this.urlBase + "?genero=" + genero + "&titulo=" + titulo;
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