export class Usuario{
    nome?: string;
    email?: string;
    senha?: string;
}

export class Credenciais{
    email?: string;
    senha?: string;
}

export class AccessToken{
    accessToken?: string;
}

export class TokenSessaoUsuario{
    nome?: string;
    email?: string;
    accessToken?: string;
    expiracao?: number;
    perfil?: "USUARIO" | "ADMNISTRADOR"  
}

