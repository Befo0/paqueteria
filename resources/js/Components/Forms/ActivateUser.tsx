import { useModal } from "@/hooks/useModal";
import SecondaryButton from "../Buttons/SecondaryButton";
import Modal from "../Modals/Modal";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function ActivateUser({userId}: {userId: number}){

    const { isModalOpen, openModal, closeModal } = useModal()
    const { patch, processing, reset} = useForm()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        patch(route('admin.activate',userId), {
            onSuccess: () => {
                reset()
                closeModal()
                toast.success('El usuario se ha activado correctamente')
            },
            onError: () => {
                toast.error('Hubo un error al activar el usuario')
            }
        })
    }

    return(
        <>
            <SecondaryButton onClick={openModal}>
                Activar
            </SecondaryButton>
            <Modal show={isModalOpen} onClose={closeModal}>
                <section className="p-4 sm:p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-col sm:justify-between">
                            <div className="flex items-center flex-col gap-y-4">
                                <h2 className="text-3xl font-semibold mt-4 text-gray-800">Estas seguro de esta acción?</h2>
                                <p className="text-gray-600 mt-2 text-xl px-6">
                                    Esto activara el usuario eliminado
                                </p>
                            </div>
                            <div className="flex gap-x-6 justify-center mt-4">
                                <PrimaryButton type="submit" disabled={processing}>
                                    Activar
                                </PrimaryButton>
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