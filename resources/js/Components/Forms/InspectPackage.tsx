import { useState } from "react"
import PrimaryButton from "../Buttons/PrimaryButton"
import Modal from "../Modals/Modal"
import SecondaryButton from "../Buttons/SecondaryButton"
import InputLabel from "../Inputs/InputLabel"
import TextInput from "../Inputs/TextInput"
import Checkbox from "../Inputs/Checkbox"
import { Link, useForm } from "@inertiajs/react"
import { toast} from "sonner"
import { Data } from "@/types/packages"
import { useModal } from "@/hooks/useModal"

export default function InspectPackage({ packageContent }: { packageContent: Data }) {

    const { isModalOpen, openModal, closeModal} = useModal()
    const [received, setReceived] = useState(false)
    const { patch } = useForm()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        patch(route('paquetes.recibido', packageContent.id), {
            onSuccess: () => {
                closeModal();
                setReceived(false)
                toast.success('El paquete se ha marcado como recibido correctamente');
            },
            onError: () => {
                toast.error('Ocurrio un error al actualizar el paquete')
            }
        })
    }

    return (
        <>
            <PrimaryButton onClick={openModal}>Inspeccionar</PrimaryButton>

            <Modal show={isModalOpen} onClose={closeModal}>
                <form onSubmit={handleSubmit}>
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
                                <TextInput readOnly value={packageContent.usuarioRecibio || ''} />
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
                            <PrimaryButton type="submit" disabled={!received}>
                                Aceptar
                            </PrimaryButton>
                            {
                                packageContent.estadoEntrega === null
                                &&
                                <Link href={route('paquete.registrado', packageContent.id)} className="inline-flex items-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-blue-900">
                                    Ver proceso de envio    
                                </Link>
                            }
                            <SecondaryButton type="button" onClick={closeModal}>
                                Cancelar
                            </SecondaryButton>
                        </div>
                    </div>
                </form>
            </Modal>


        </>
    )
}