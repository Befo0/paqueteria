import { Data, PaginationLink } from "@/types/packages"
import Pagination from "../Links/Pagination"

interface Props {
    deleted: Data[],
    links: PaginationLink[],
}

export default function ListOfDeleted({ deleted, links }: Props) {

    const packages = deleted || []

    return (
        <div className="max-w-8xl mx-auto p-4 sm:p-6 lg:p-8">
            {
                links.length > 3
                &&
                <div className="bg-white rounded-lg p-4">
                    <Pagination links={links} />
                </div>
            }
            <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full overflow-x-auto">
                    {
                        packages.length > 0
                            ?
                            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg bg-white">
                                <thead>
                                    <tr className="bg-gray-800 text-white text-left">
                                        <th className="px-6 py-3">Título</th>
                                        <th className="px-6 py-3">Usuario Destinatario</th>
                                        <th className="px-6 py-3">Remitente</th>
                                        <th className="px-6 py-3">Fecha de entrega</th>
                                        <th className="px-6 py-3">Usuario Recepcion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {packages.map((content) => (
                                        <tr
                                            key={content.id}
                                            className="border-b border-gray-300"
                                        >
                                            <td className="px-6 py-4">{content.nombrePaquete}</td>
                                            <td className="px-6 py-4">{content.usuarioNombre}</td>
                                            <td className="px-6 py-4">{content.remitente}</td>
                                            <td className="px-6 py-4">
                                               {content.horaLlegadaPaquete} 
                                            </td>
                                            <td className="px-6 py-4">
                                                {content.usuarioRecepcion}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            :
                            <div>
                                <p >No has recibido ningun paquete</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}