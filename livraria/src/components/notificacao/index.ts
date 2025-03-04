import { toast } from "react-toastify";

export const notificacao = () => {

    function notificar(mensagem: string, tipo: "success" | "info" | "warning" | "error") {
        toast(mensagem, {
            type: tipo
        })

    }

    return {
        notificar
    }
}