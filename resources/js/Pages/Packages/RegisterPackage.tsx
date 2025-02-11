import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, usePage } from "@inertiajs/react"
import { Users } from "@/types/users"
import Header from "@/Components/Header"
import RegisterForm from "@/Components/Forms/RegisterForm"
import { PageProps } from "@/types"
import Unauthorized from "@/Components/Unauthorized"

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
                   <Unauthorized /> 
            }

        </AuthenticatedLayout>
    )
}