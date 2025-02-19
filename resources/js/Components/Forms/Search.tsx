import { useState } from "react";
import { useForm } from "@inertiajs/react";
import InputError from "../Inputs/InputError";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";

export default function Search() {
    const { data, setData, get, errors, reset } = useForm({
        state_id: 1
    })

    const [filter, setFilter] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        get(route('admin.users'), {
            onSuccess: () => {
                reset()
                setFilter(false);
            }
        })
    }

    return (
        <div className="max-w-8xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-lg p-4">
                {
                    filter ?
                        <form onSubmit={handleSubmit} action="" className="flex flex-col sm:flex-col sm:justify-center sm:items-center gap-y-6 ">
                            <div className="flex flex-col items-center gap-y-2">
                                <select name="" id="" className="form-style" onChange={(e) => setData('state_id', Number(e.target.value))}>
                                    <option value="" disabled selected>Seleccionar</option>
                                    <option value="0">Eliminados</option>
                                    <option value="1">Activos</option>
                                    <option value="2">Mostrar todos</option>
                                </select>
                                <InputError message={errors.state_id} className="mt-2" />
                            </div>
                            <div className="flex gap-x-4 justify-center">
                                <PrimaryButton type="submit" > Filtrar </PrimaryButton>
                                <SecondaryButton type="button" onClick={() => setFilter(false)} > Cancelar </SecondaryButton>
                            </div>
                        </form>
                        :
                        <div className="flex flex-col items-center gap-y-4">
                            <label htmlFor="">Filtrar usuarios</label>
                            <PrimaryButton type="button" onClick={() => setFilter(true)}> Filtrar </PrimaryButton>
                        </div>
                }
            </div>
        </div>
    )
}