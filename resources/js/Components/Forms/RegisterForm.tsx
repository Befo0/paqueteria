import { useForm } from "@inertiajs/react"
import { toast, Toaster } from "sonner"
import InputError from "../Inputs/InputError"
import PrimaryButton from "../Buttons/PrimaryButton"
import { Users } from "@/types/users"
import InputLabel from "../Inputs/InputLabel"
import TextInput from "../Inputs/TextInput"

export default function RegisterForm({ users }: { users: Users }) {
    const { data, setData, post, errors, reset, processing } = useForm({
        nombrePaquete: '',
        descripcionPaquete: '',
        remitente: '',
        usuarioDestinatario: 0,
        usuarioRecibio: '',
        horaLlegadaPaquete: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        post(route('paquetes.guardar'), {
            onSuccess: () => {
                reset();
                toast.success('El paquete se ha registrado correctamente')
            },
            onError: () => {
                toast.error('Ha habido un error al registrar el paquete')
            }
        })
    }

    return (
        <>
            <Toaster richColors position="top-right" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form action="" onSubmit={handleSubmit} >
                    <div className="flex flex-col mb-4">
                        <InputLabel htmlFor="title">Titulo</InputLabel>
                        <TextInput type="text" id="title" placeholder="Titulo del paquete" value={data.nombrePaquete} onChange={(e) => setData('nombrePaquete', e.target.value)} />
                        <InputError message={errors.nombrePaquete} className="mt-2 font-bold" />
                    </div>
                    <textarea id="" className="block w-full form-style h-32 resize-none" placeholder="Descripción del paquete..." onChange={(e) => setData('descripcionPaquete', e.target.value)} value={data.descripcionPaquete}></textarea>
                    <InputError message={errors.descripcionPaquete} className="mt-2 font-bold" />
                    <div className="flex flex-col mt-4 gap-y-4">
                        <TextInput type="text" id="sender" placeholder="Enviado por..." onChange={(e) => setData('remitente', e.target.value)} value={data.remitente} />
                        <InputError message={errors.remitente} className="mt-2 font-bold" />
                        <div className="flex justify-start items-center gap-x-2">
                            <InputLabel htmlFor="addressee">Destinatario del paquete</InputLabel>
                            <select name="" id="addressee" className="form-style" onChange={(e) => setData('usuarioDestinatario', Number(e.target.value))} value={data.usuarioDestinatario || 0}>
                                <option value="0" disabled >Selecciona el nombre</option>
                                {
                                    users.map(user => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))
                                }
                            </select>
                            <InputError message={errors.usuarioDestinatario} className="font-bold" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <TextInput type="text" placeholder="Nombre de quien lo recibio..." className="w-full" onChange={(e) => setData('usuarioRecibio', e.target.value)} value={data.usuarioRecibio} />
                        <InputError message={errors.usuarioRecibio} className="mt-2 font-bold" />
                        <div className="mt-4 flex items-center gap-x-4">
                            <InputLabel htmlFor="arriveTime">Hora de llegada</InputLabel>
                            <input type="datetime-local" name="" id="arriveTime" className="form-style" onChange={(e) => setData('horaLlegadaPaquete', e.target.value)} value={data.horaLlegadaPaquete} />
                            <InputError message={errors.horaLlegadaPaquete} className="mt-2 font-bold" />
                        </div>
                    </div>
                    <PrimaryButton className="mt-4" disabled={processing} >Registrar paquete</PrimaryButton>
                </form>
            </div>
        </>
    )
}