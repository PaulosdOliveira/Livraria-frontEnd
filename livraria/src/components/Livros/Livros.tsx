'use client'



interface sessaoGeneroProps {
    genero?: "DRAMA" | "ROMANCE" | "CIENCIA" | "TERROR" | "COMEDIA" | "SUSPENSE";
    corGenero?: string;
    children?: React.ReactNode;
    fundoGenero?: string
}

export const SessaoGenero: React.FC<sessaoGeneroProps> = ({ corGenero, genero, children, fundoGenero }) => {
    return (
        <>
            <div className={`${corGenero} mb-1 w-24 absolute  translate-y-16 translate-x-4  rounded-e-full  `} >
                <h1 className="text-white  rounded-e-full shadow-md shadow-gray-500">{genero}</h1>
            </div>
            <section style={{ backgroundSize: 'contain', backgroundImage: `url(${fundoGenero})` }}
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
    return (
        <>
            <section className=" flex items-center"
                style={{ minHeight: '96vh', maxHeight: 'auto', width: 'auto' }}
            >
                <div id="gridPesquisa" style={{ width: 'auto', height: 'auto' }}
                    className="  grid grid-cols-2   m-auto ">
                    {children}
                </div>
            </section>
        </>
    )
}




