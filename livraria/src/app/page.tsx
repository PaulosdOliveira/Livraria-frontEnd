'use client'
import { UseAuth } from "@/resources/Usuarios/LoginService"
import Biblioteca from "./biblioteca/page";
import Login from "./login/page";


export default function Home() {

  const auth = UseAuth();
  const usuario = auth.getSessaoUsuario;
  if (!usuario) {
    return (<Login></Login>);
  }
  return (<Biblioteca></Biblioteca>);


}
