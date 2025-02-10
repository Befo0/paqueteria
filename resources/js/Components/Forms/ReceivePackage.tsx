import { newPackage } from "@/types/packages";
import InputLabel from "../Inputs/InputLabel";
import TextInput from "../Inputs/TextInput";
import { Link } from "@inertiajs/react";

export default function ReceivePackage({ newPackage }: { newPackage: newPackage }) {
    return (
        <>
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h3 className="text-gray-700 font-bold text-xl">Te ha llegado un nuevo paquete!</h3>
                <div className="flex flex-col mt-4 gap-y-2">
                    <InputLabel>Titulo del paquete</InputLabel>
                    <TextInput readOnly value={newPackage.titulo} />
                    <InputLabel>Remitente del paquete</InputLabel>
                    <TextInput readOnly value={newPackage.remitente} />

                    <h4 className="text-gray-700 font-semibold text-lg mt-4">Escoge una opción de entrega del paquete</h4>
                    <div className="flex justify-center gap-x-6 mt-4">
                        <Link href={route('paquete.entrega', { paquete: newPackage.id, estado: 1 })} as="button" className="inline-flex items-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-blue-900" method="patch">
                            Recoger personalmente
                        </Link>
                        <Link href={route('paquete.entrega', { paquete: newPackage.id, estado: 2 })} as="button" className="inline-flex items-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-blue-900" method="patch">
                            Enviar a mi oficina
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}