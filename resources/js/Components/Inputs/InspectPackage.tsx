import { useState } from "react"
import PrimaryButton from "../Buttons/PrimaryButton"
import { type Package } from "@/types/packages"
import Modal from "../Modals/Modal"
import SecondaryButton from "../Buttons/SecondaryButton"
import InputLabel from "./InputLabel"
import TextInput from "./TextInput"
import Checkbox from "./Checkbox"
import { Link } from "@inertiajs/react"

export default function InspectPackage({ packageContent }: { packageContent: Package }) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [received, setReceived] = useState(false)

    const closeModal = () => {
        setIsModalOpen(false)
        setReceived(false)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    return (
        <>
            <PrimaryButton onClick={openModal}>Inspeccionar</PrimaryButton>

            <Modal show={isModalOpen} onClose={closeModal}>
                <section className="p-4 sm:p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-col sm:justify-between">
                            <div className="w-full mb-4">
                                <InputLabel>Titulo del paquete</InputLabel>
                                <TextInput readOnly className="w-full" value={packageContent.nombrePaquete} />
                            </div>
                            <InputLabel>Descipción del paquete</InputLabel>
                            <textarea value={packageContent.descripcionPaquete} readOnly className="form-style resize-none" ></textarea>
                            <InputLabel className="mt-4">Usuario que recibio el paquete</InputLabel>
                            <TextInput readOnly value={packageContent.usuarioRecibio} />
                            <div className="flex flex-col sm:flex-row items-center mt-4 gap-x-6">
                                <InputLabel>Hora de llegada del paquete</InputLabel>
                                <input className="form-style" readOnly type="datetime-local" value={packageContent.horaLlegadaPaquete} />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="p-6">
                    <div className="flex items-center mb-4 gap-x-6">
                        <InputLabel>Marcar como recibido</InputLabel>
                        <Checkbox onChange={() => setReceived(!received)} />
                    </div>
                    <div className="w-full flex justify-evenly">
                        <Link href={route('paquetes.recibido', packageContent.id)} disabled={!received} method="patch" className={`inline-flex items-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-blue-900 ${!received && 'opacity-25'}`}>

                            Aceptar
                        </Link>

                        <SecondaryButton type="button" onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>


        </>
    )
}