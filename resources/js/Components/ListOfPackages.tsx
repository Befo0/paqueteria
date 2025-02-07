import { usePage } from "@inertiajs/react";
import InspectPackage from "./Inputs/InspectPackage";
import { PageProps } from "@/types";

export default function PackagesForm() {
    const packages = usePage<PageProps>().props.packages

    return (
        <div className="max-w-8xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full overflow-x-auto">
                    {
                        packages.length > 0
                            ?

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
                                            <td className="px-6 py-4 text-center">
                                                <InspectPackage packageContent={content} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            :
                            <div>
                                <p >No has recibido paquetes</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}