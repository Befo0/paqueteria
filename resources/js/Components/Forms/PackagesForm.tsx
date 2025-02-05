import { Packages } from "@/types/packages";

export default function PackagesForm({ packages }: { packages: Packages }) {
    return (
        <div className="max-w-8xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Remitente</th>
                                <th>Hora de LLegada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                packages.map(content => 
                                    <tr key={content.id}>
                                        <td>{content.nombrePaquete}</td>
                                        {/* <td>{content.descripcionPaquete}</td> */}
                                        <td>{content.remitente}</td>
                                       {/*  <td>{content.usuarioRecibio}</td> */}
                                        <td>{content.horaLlegadaPaquete}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}