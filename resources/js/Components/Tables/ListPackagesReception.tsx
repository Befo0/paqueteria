import { Data, PaginationLink } from "@/types/packages"
import { Toaster } from "sonner"
import SendPackage from "../Forms/SendPackage"
import { User } from "@/types"
import DeletePackage from "../Forms/DeletePackage"
import Pagination from "../Links/Pagination"

interface Props {
    registeredPackages: Data[],
    links: PaginationLink[],
    user: User,
}



export default function ListPackagesReception({ registeredPackages, links, user }: Props) {

    const packages = registeredPackages || []

    return (
        <div className="max-w-8xl mx-auto p-4 sm:p-6 lg:p-8">
            <Toaster richColors position="top-right" />
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
                                        <th className="px-6 py-3">Destinatario</th>
                                        <th className="px-6 py-3">Remitente</th>
                                        <th className="px-6 py-3">Forma de recibir</th>
                                        <th className="px-6 py-3 text-center">Editar</th>
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
                                            <td className="px-6 py-4">{content.estadoEntrega !== null ? (content.estadoEntrega === 1 ? 'Recoger' : 'Enviar') : 'Sin especificar'}</td>
                                            <td className="px-6 py-4 text-center flex justify-center gap-x-6">
                                                {
                                                    content.estadoEntrega !== 1 && (content.usuarioRecibio === null && content.estadoEntrega !== null) && <SendPackage packageId={content.id} />
                                                }
                                                {
                                                    user.idRol === 1 && content.estadoEntrega === null && <DeletePackage packageId={content.id} />
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            :
                            <div>
                                <p >No hay paquetes registrados</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}