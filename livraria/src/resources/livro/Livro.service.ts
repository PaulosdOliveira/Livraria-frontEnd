import { UseAuth } from '../Usuarios/LoginService';
import { Livro , PaginaLivro} from './Livro.resource'



interface Resultado {
    status?: number;
    erro?: string;
}

class UseLivroService {
    urlBase = "http://localhost:8080/livros";


    //Metodo para buscar livros por genero e/ou titulo
    async buscarLivros( genero: "DRAMA" | "ROMANCE" | "CIENCIA" | "TERROR" | "COMEDIA" | "SUSPENSE" | undefined,
         titulo: string | undefined, numeroPagina: number): Promise<PaginaLivro> {

        const url = this.urlBase + "?genero=" + genero + "&titulo=" + titulo  + "&numero-pagina=" + numeroPagina ;
        const usuarioLogado = UseAuth().getSessaoUsuario();
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${usuarioLogado?.accessToken}`
            }
        });
        return await response.json();

    }

    //Buscar sessão genero
    async buscarSeesaoGenero(genero: string): Promise<Livro[]> {
        const url = this.urlBase + "/sessao-genero?genero=" + genero;
        const usuarioLogado = UseAuth().getSessaoUsuario();
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${usuarioLogado?.accessToken}`
            }
        });
        return await response.json();
    }

    //Salvar novo livro
    async salvarLivro(dados: FormData) {
        const url = this.urlBase;
        const usuarioLogado = UseAuth().getSessaoUsuario();
        const resposta = await fetch(url, {
            method: "POST",
            body: dados,
            headers: {
                "Authorization": `Bearer ${usuarioLogado?.accessToken}`
            }
        })
        const status = resposta.status;
        const resultado: Resultado = { status: status };
        if (status === 409) {
            const erroMensagem = await resposta.json();
            resultado.erro = erroMensagem.erro;
        }
        return resultado;

    }

}

export const LivroService = () => new UseLivroService();