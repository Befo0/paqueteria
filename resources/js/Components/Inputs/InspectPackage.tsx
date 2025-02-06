import { useState } from "react"
import PrimaryButton from "../Buttons/PrimaryButton"
import { type Package } from "@/types/packages"
import Modal from "../Modals/Modal"
import SecondaryButton from "../Buttons/SecondaryButton"
import InputLabel from "./InputLabel"
import TextInput from "./TextInput"
import Checkbox from "./Checkbox"

export default function InspectPackage({ packageContent }: { packageContent: Package }) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [received, setReceived] = useState(false)

    const closeModal = () => {
        setIsModalOpen(false)
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
                                <TextInput className="pointer-events-none w-full" value={packageContent.nombrePaquete} />
                            </div>
                            <InputLabel>Descipción del paquete</InputLabel>
                            <textarea value={packageContent.descripcionPaquete} className="pointer-events-none form-style resize-none" ></textarea>
                            <InputLabel className="mt-4">Usuario que recibio el paquete</InputLabel>
                            <TextInput className="pointer-events-none" value={packageContent.usuarioRecibio} />
                            <div className="flex flex-col sm:flex-row items-center mt-4 gap-x-6">
                                <InputLabel>Hora de llegada del paquete</InputLabel>
                                <input className="form-style pointer-events-none" type="datetime-local" value={packageContent.horaLlegadaPaquete} />
                            </div>
                        </div>
                    </div>
                </section>
                <form action="" className="p-6">
                    <div className="flex items-center mb-4 gap-x-6">
                        <InputLabel>Marcar como recibido</InputLabel>
                        <Checkbox onChange={() => setReceived(!received)} />
                    </div>
                    <div className="w-full flex justify-evenly">
                        <PrimaryButton type="submit" disabled={!received}>
                            Aceptar
                        </PrimaryButton>
                        <SecondaryButton type="button" onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>
                    </div>
                </form>
            </Modal>


        </>
    )
}