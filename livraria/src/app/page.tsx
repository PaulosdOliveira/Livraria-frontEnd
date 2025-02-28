'use client'
import { UseAuth } from "@/resources/Usuarios/LoginService"
import Biblioteca from "./biblioteca/page";
import Login from "./login/page";


export default function Home() {

  const auth = localStorage.getItem("_login");

  if (auth) {
    return (<Biblioteca></Biblioteca>);
  }
  return (<Login></Login>);




}
