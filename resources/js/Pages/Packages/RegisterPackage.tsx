import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, usePage } from "@inertiajs/react"
import { Users } from "@/types/users"
import Header from "@/Components/Header"
import RegisterForm from "@/Components/Forms/RegisterForm"
import { PageProps } from "@/types"

export default function RegisterPackage({ users }: { users: Users }) {
    const user = usePage<PageProps>().props.auth.user

    return (
        <AuthenticatedLayout
            header={
                <Header>
                    Registrar
                </Header>
            }
        >
            <Head title="Registrar Paquete" />

            {
                user.idRol === 1 || user.idRol === 2
                    ?
                    <RegisterForm users={users} />
                    :
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    No tienes permisos para ingresar a esta pagina
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </AuthenticatedLayout>
    )
}