import { newPackage } from "@/types/packages";
import { Link } from "@inertiajs/react";

export default function ReceivePackage({ newPackage }: { newPackage: newPackage }) {
    return (
        <>
            {
                newPackage.entrega === null
                    ?
                    <div className="max-w-2xl mx-auto p-6 sm:p-8 lg:p-10 bg-white shadow-lg rounded-lg border border-gray-200 mt-6">
                        <h3 className="text-gray-800 font-bold text-2xl text-center">¡Te ha llegado un nuevo paquete!</h3>
                        <div className="flex flex-col mt-6 gap-y-3">
                            <div>
                                <label className="block text-gray-600 font-medium">Título del paquete</label>
                                <input
                                    readOnly
                                    value={newPackage.titulo}
                                    className="w-full mt-1 p-2 border rounded-md bg-gray-100 text-gray-800 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium">Remitente del paquete</label>
                                <input
                                    readOnly
                                    value={newPackage.remitente}
                                    className="w-full mt-1 p-2 border rounded-md bg-gray-100 text-gray-800 shadow-sm"
                                />
                            </div>

                            <h4 className="text-gray-700 font-semibold text-lg mt-6 text-center">Escoge una opción de entrega</h4>
                            <div className="flex justify-center gap-x-6 mt-5">
                                <Link
                                    href={route('paquete.entrega', { paquete: newPackage.id, estado: 1 })}
                                    as="button"
                                    className="inline-flex items-center rounded-lg border border-transparent bg-blue-800 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition duration-200 ease-in-out hover:bg-blue-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md"
                                    method="patch"
                                >
                                    Recoger personalmente
                                </Link>
                                <Link
                                    href={route('paquete.entrega', { paquete: newPackage.id, estado: 2 })}
                                    as="button"
                                    className="inline-flex items-center rounded-lg border border-transparent bg-green-800 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition duration-200 ease-in-out hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md"
                                    method="patch"
                                >
                                    Enviar a mi oficina
                                </Link>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    {
                                        newPackage.entrega === 1 && newPackage.entrega !== null
                                            ? 'Puedes ir a traer el paquete a recepción'
                                            :
                                            'El paquete te llegara enseguida'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}