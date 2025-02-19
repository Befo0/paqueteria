import { useModal } from "@/hooks/useModal";
import PrimaryButton from "../Buttons/PrimaryButton";
import Modal from "../Modals/Modal";
import SecondaryButton from "../Buttons/SecondaryButton";
import InputLabel from "../Inputs/InputLabel";
import TextInput from "../Inputs/TextInput";
import { Data } from "@/types/packages";

export default function InspectDeletedPackage({packageContent}: {packageContent: Data}) {
    const { isModalOpen, openModal, closeModal } = useModal()

    return (
        <>
            <PrimaryButton onClick={openModal}>Inspeccionar paquete eliminado</PrimaryButton>

            <Modal show={isModalOpen} onClose={closeModal}>
                <section className="p-4 sm:p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-col sm:justify-between">
                            <div className="w-full mb-4">
                                <InputLabel>Titulo del paquete</InputLabel>
                                <TextInput readOnly className="w-full pointer-events-none" value={packageContent.nombrePaquete} />
                            </div>
                            <InputLabel>Descipción del paquete</InputLabel>
                            <textarea value={packageContent.descripcionPaquete} readOnly className="form-style resize-none pointer-events-none" ></textarea>
                            <InputLabel className="mt-4">Usuario que recibio el paquete</InputLabel>
                            <TextInput readOnly value={packageContent.usuarioRecibio || ''} className="pointer-events-none" />
                            <div className="flex flex-col sm:flex-row items-center mt-4 gap-x-6">
                                <InputLabel>Hora de llegada del paquete</InputLabel>
                                <input className="form-style" readOnly type="datetime-local" value={packageContent.horaLlegadaPaquete} />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="p-6">
                    <div className="w-full flex justify-evenly">
                        <SecondaryButton type="button" onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>
        </>
    )
}