'use client'



interface sessaoGeneroProps {
    genero?: "DRAMA" | "ROMANCE" | "CIENCIA" | "TERROR" | "COMEDIA" | "SUSPENSE";
    corGenero?: string;
    children?: React.ReactNode;
}

export const SessaoGenero: React.FC<sessaoGeneroProps> = ({ corGenero, genero, children }) => {
    return (
        <>
            <div className={`${corGenero} mb-1 w-24 absolute  translate-y-16 translate-x-4  rounded-e-full  `} >
                <h1 className="text-white  rounded-e-full shadow-md shadow-gray-500">{genero}</h1>
            </div>
            <section style={{ backgroundSize: 'contain', backgroundImage: 'url(https://img.pikbest.com/wp/202343/crumpled-paper-texture-of-black-with-artistic-folds-on-a-dark-wallpaper-background_9980848.jpg!w700wp)' }}
                id="sessaoGenero" className="  w-auto   shadow-gray-200 min-h-72 py-4  mt-24   overflow-auto">
                <div className="flex items-start">
                    {children}
                </div>
            </section>
        </>
    )
}


interface pesquisaPorps {
    children: React.ReactNode;
    voltar?: (event: any) => void
}
export const LivrosPesquisa: React.FC<pesquisaPorps> = ({ children, voltar }) => {


    function CriarNumeros(numero: number) {
        return (
            <NumeroPagina  key={numero} numero={numero} />
        )
    }

    function renderizarNumero(qtdPaginas: number) {
        const numeros = new Array();
        for (let i = 1; i <= qtdPaginas; i++) {
            numeros.push(i);
        }
        return (
            numeros.map(CriarNumeros)
        )
    }

    return (
        <>
            <section className=" flex items-center"
                style={{ minHeight: '96vh', maxHeight: 'auto', width: 'auto' }}
            >
                <div id="gridPesquisa" style={{ width: 'auto', height: 'auto' }}
                    className="  grid grid-cols-2   m-auto ">
                    {children}
                    <div onClick={voltar} className="text-white text-center pt-1 material-icons bg-black z-50 absolute -translate-x-12 mt-1 rounded-full h-8 w-8 hover:cursor-pointer hover:-translate-y-0.5  transition duration-700">home</div>
                </div>
            </section>
        </>
    )
}


interface numeroPaginaProps {
    numero: number;
    onClick?: (event: any) => void;
}

export const NumeroPagina: React.FC<numeroPaginaProps> = ({ numero, onClick }) => {

    return (
        <p onClick={() => onClick? onClick(numero) : undefined}
        className="text-white text-center  hover:-translate-y-0.5 cursor-pointer
         p-1.5 w-9 h-9 mx-0.5 bg-gray-500 inline-block rounded-full transition-all duration-300">{numero}</p>
    )
}



