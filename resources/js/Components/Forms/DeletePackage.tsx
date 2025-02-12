import { useState } from "react";
import DangerButton from "../Buttons/DangerButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import Modal from "../Modals/Modal";
import { useModal } from "@/hooks/useModal";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function DeletePackage({packageId}: {packageId: number}) {

    const {isModalOpen, openModal, closeModal} = useModal()
    const {delete: destroy, processing, reset} = useForm()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        destroy(route('paquete.eliminar', packageId), {
            onSuccess: () => {
                reset()
                closeModal()
                toast.success('El paquete se ha eliminado correctamente')
            },
            onError: () => {
                toast.error('Ha ocurrido un error al eliminar el paquete')
            }
        })
    }

    return (
        <>
            <DangerButton onClick={openModal}>
                Eliminar
            </DangerButton>
            <Modal show={isModalOpen} onClose={closeModal}>
                <section className="p-4 sm:p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-col sm:justify-between">
                            <div className="flex items-center flex-col gap-y-4">
                                <h2 className="text-3xl font-semibold mt-4 text-gray-800">Estas seguro de esta acción?</h2>
                                <p className="text-gray-600 mt-2 text-xl px-6">
                                    Esto no se puede revertir
                                </p>
                            </div>
                            <div className="flex gap-x-6 justify-center mt-4">
                                <DangerButton type="submit" disabled={processing}>
                                    Eliminar
                                </DangerButton>
                                <SecondaryButton type="button" onClick={closeModal}>
                                    Cancelar
                                </SecondaryButton>
                            </div>
                        </form>
                    </div>
                </section>
            </Modal>
        </>
    )
}