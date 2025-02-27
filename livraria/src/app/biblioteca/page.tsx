'use client'

import { LivrosPesquisa, Principal } from "@/components/Livros/Livros"
import {Template} from "@/components/Template"


export default function Biblioteca(){
    return(
        <Template>
           <Principal>
            <LivrosPesquisa/>
           </Principal>
        </Template>
    )
}


