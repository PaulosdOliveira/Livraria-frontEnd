'use client'

import { Credenciais, AccessToken, TokenSessaoUsuario, Usuario, } from "./Usuarios.resources"
import jwt from 'jwt-decode'
import { useRouter } from "next/navigation"

class LoginService {
    urlBase: string = "http://localhost:8080/usuario";
    static LOGADO: string = "_login";


    /// Método para logar usuário
    async logar(credenciais: Credenciais): Promise<AccessToken> {
        const resposta = await fetch(this.urlBase + "/login", {
            method: 'POST',
            body: JSON.stringify(credenciais),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (resposta.status === 401) {
            throw new Error("Email ou senha incorretos");
        }
        return await resposta.json();
    }


    //Método para cadastrar um usuário
    async cadastrar(credenciais: Usuario): Promise<void> {
        const resposta = await fetch(this.urlBase, {
            method: 'POST',
            body: JSON.stringify(credenciais),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (resposta.status === 201) {
            useRouter().push("/login");
        }
        if (resposta.status === 409) {
            const erroBack = await resposta.json();
            throw new Error(erroBack.Error);
        }
    }

    criarSessao(token: AccessToken) {
        if (token.accessToken) {
            const tokenDecodificado: any = jwt(token.accessToken);
            const tokenSessaoUsuario: TokenSessaoUsuario = {
                accessToken: token.accessToken,
                email: tokenDecodificado.sub,
                nome: tokenDecodificado.nome,
                perfil: tokenDecodificado.role,
                expiracao: tokenDecodificado.exp
            }
            this.setSessaoUsuario(tokenSessaoUsuario);
        }
    }


    setSessaoUsuario(tokenSessaoUsuario: TokenSessaoUsuario) {
        try {
            localStorage.setItem(LoginService.LOGADO, JSON.stringify(tokenSessaoUsuario));
        } catch (erro) {

        }

    }


    // Colentando cookie do navegador
    getSessaoUsuario(): TokenSessaoUsuario | null {
            const authString = localStorage.getItem(LoginService.LOGADO);
            if (!authString) {
                return null;
            }

            const token: TokenSessaoUsuario = JSON.parse(authString);
            return token;

    }

    //Verificando se a sessão é valida
    sessaoValida(): boolean {


        const sessaoUssuario: TokenSessaoUsuario | null = this.getSessaoUsuario();
        if (!sessaoUssuario) {
            return false;
        }
        const expiracao: number | undefined = sessaoUssuario.expiracao;
        if (expiracao) {
            const expiracaoEmMinutos = expiracao * 1000;
            return new Date() < new Date(expiracaoEmMinutos) ;
        }
        return true;
    }

    //Deslogar
    deslogar(): void {
        try {
            localStorage.removeItem(LoginService.LOGADO);
        } catch (error) {

        }
    }

}


export const UseAuth = () => new LoginService();



