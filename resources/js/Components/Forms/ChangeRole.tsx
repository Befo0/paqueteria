import { useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import Modal from "../Modals/Modal";
import InputLabel from "../Inputs/InputLabel";
import { Roles } from "@/types/roles";
import SecondaryButton from "../Buttons/SecondaryButton";
import { useForm } from "@inertiajs/react";
import InputError from "../Inputs/InputError";
import { toast } from "sonner";
import { adminUsers } from "@/types/users";

interface Props {
    user: adminUsers
    roles: Roles
}

export default function ChangeRole({ user, roles }: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const { data, setData, patch, errors, processing, reset } = useForm({
        idRol: 0
    })

    const openModal = () => {
        setIsModalOpen(true)
        reset()
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        patch(route('admin.roles', user.id), {
            onSuccess: () => {
                closeModal()
                toast.success('El cambio de rol ha sido exitoso')
            },
            onError: () => {
                toast.error('Ha ocurrido un error al cambiar el rol')
            }
        })
    }

    return (
        <>
            <PrimaryButton onClick={openModal}>
                Cambiar Rol
            </PrimaryButton>

            <Modal show={isModalOpen} onClose={closeModal} >
                <section className="p-4 sm:p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-col sm:justify-between">
                            <InputLabel>Selecciona el rol a asignar</InputLabel>
                            <select value={data.idRol || 0} className="form-style" onChange={(e) => setData('idRol', Number(e.target.value))}>
                                <option value="0" disabled>Selecciona el rol</option>
                                {
                                    roles.map(role => (
                                        <option key={role.id} value={role.id}>{role.nombreRol}</option>
                                    ))
                                }
                            </select>
                            <InputError message={errors.idRol} className="mt-2 font-bold" />
                            <div className="flex gap-x-6 justify-center mt-4">
                                <PrimaryButton type="submit" disabled={processing}>
                                    Cambiar Rol
                                </PrimaryButton>
                                <SecondaryButton type="button" onClick={() => setIsModalOpen(false)}>
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