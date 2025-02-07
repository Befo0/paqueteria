import { useState } from "react"
import PrimaryButton from "../Buttons/PrimaryButton"
import Modal from "../Modals/Modal"
import SecondaryButton from "../Buttons/SecondaryButton"
import InputLabel from "../Inputs/InputLabel"
import TextInput from "../Inputs/TextInput"
import Checkbox from "../Inputs/Checkbox"
import { useForm } from "@inertiajs/react"
import { toast, Toaster } from "sonner"
import { Data } from "@/types/packages"

export default function InspectPackage({ packageContent }: { packageContent: Data }) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [received, setReceived] = useState(false)
    const {patch} = useForm()

    const closeModal = () => {
        setIsModalOpen(false)
        setReceived(false)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const markAsReceived = () => {
        patch(route('paquetes.recibido', packageContent.id), {
            onSuccess: () => {
                toast.success('El paquete se ha marcado como recibido correctamente')
            },
            onError: () => {
                toast.error('Ocurrio un error al actualizar el paquete')
            }
        })
    }

    return (
        <>
            <PrimaryButton onClick={openModal}>Inspeccionar</PrimaryButton>
            <Toaster richColors position="top-right" />

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
                        <PrimaryButton onClick={markAsReceived} disabled={!received}>                            
                            Aceptar
                        </PrimaryButton>

                        <SecondaryButton type="button" onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>


        </>
    )
}