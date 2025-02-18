import { usePage } from "@inertiajs/react";
import InspectPackage from "../Forms/InspectPackage";
import { PageProps } from "@/types";
import Pagination from "../Links/Pagination";
import { Toaster } from "sonner";
import { Data, PaginationLink } from "@/types/packages";
import InspectDeletedPackage from "../Forms/InspectDeletedPackage";
import Unauthorized from "../Unauthorized";

interface Props {
    url: string
    packages: Data[]
    links: PaginationLink[]
}

export default function ListOfPackages({ url, packages, links }: Props) {
    const registeredPackages = packages || []
    const packagesLinks = links || [] 

    return (
        <div className="max-w-8xl mx-auto p-4 sm:p-6 lg:p-8">
            {
                registeredPackages.length > 0
                    ?
                    <>
                        <Toaster richColors position="top-right" />
                        {
                            packagesLinks.length > 3
                            &&
                            <div className="bg-white rounded-lg p-4">
                                <Pagination links={links} />
                            </div>
                        }
                        <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                            <div className="p-4 sm:p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full overflow-x-auto">
                                <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg bg-white">
                                    <thead>
                                        <tr className="bg-gray-800 text-white text-left">
                                            <th className="px-6 py-3">Título</th>
                                            <th className="px-6 py-3">Remitente</th>
                                            <th className="px-6 py-3">Hora de Llegada</th>
                                            <th className="px-6 py-3 text-center">Inspeccionar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {packages.map((content) => (
                                            <tr
                                                key={content.id}
                                                className="border-b border-gray-300"
                                            >
                                                <td className="px-6 py-4">{content.nombrePaquete}</td>
                                                <td className="px-6 py-4">{content.remitente}</td>
                                                <td className="px-6 py-4">{content.horaLlegadaPaquete}</td>
                                                <td className="px-6 py-4 text-center flex justify-center">
                                                    {
                                                        url.includes('eliminados')
                                                            ?
                                                            <InspectDeletedPackage packageContent={content} />
                                                            :
                                                            <InspectPackage packageContent={content} />
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                    :
                    <Unauthorized>
                        No has recibido paquetes
                    </Unauthorized>
            }
        </div>
    )
}