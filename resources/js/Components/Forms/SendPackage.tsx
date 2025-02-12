import { useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import Modal from "../Modals/Modal";
import InputLabel from "../Inputs/InputLabel";
import InputError from "../Inputs/InputError";
import SecondaryButton from "../Buttons/SecondaryButton";
import { useForm } from "@inertiajs/react";
import TextInput from "../Inputs/TextInput";
import { toast } from "sonner";
import { useModal } from "@/hooks/useModal";

export default function SendPackage({packageId}: {packageId: number}) {

    const { isModalOpen, openModal, closeModal } = useModal() 
    const { data, setData, patch, errors, processing, reset} = useForm({
        usuarioRecibio: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        patch(route('paquete.enviado', packageId), {
            onSuccess: () => {
                closeModal()
                reset()
                toast.success('El paquete se ha editado correctamente')
            },
            onError: () => {
                toast.error('Hubo un error al editar el paquete')
            }
        })
    }

    return (
        <>
            <PrimaryButton onClick={openModal}>
                Enviar
            </PrimaryButton>

            <Modal show={isModalOpen} onClose={closeModal} >
                <section className="p-4 sm:p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-col sm:justify-between">
                            <InputLabel>Persona encargada de entregar el paquete</InputLabel>
                            <TextInput className="mt-4" value={data.usuarioRecibio} onChange={(e) => setData('usuarioRecibio', e.target.value)} />
                            <InputError message={errors.usuarioRecibio} className="mt-2 font-bold" />
                            <div className="flex gap-x-6 justify-center mt-4">
                                <PrimaryButton type="submit" disabled={processing}>
                                    Editar registro
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