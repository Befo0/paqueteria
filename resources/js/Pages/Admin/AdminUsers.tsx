import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import Header from "@/Components/Header"
import { usePage, Head } from "@inertiajs/react"
import { PageProps } from "@/types"
import { Roles } from "@/types/roles"
import Unauthorized from "@/Components/Unauthorized"
import { UsersPagination } from "@/types/users"
import Users from "@/Components/Tables/Users"

interface Props {
    usersData: UsersPagination,
    roles: Roles
}

export default function AdminUsers({ usersData, roles }: Props) {
    const user = usePage<PageProps>().props.auth.user
    const users = usersData.data
    return (
        <AuthenticatedLayout header={
            <Header>
                Administración de usuarios
            </Header>
        }>
            <Head title="Usuarios" />
            {
                user.idRol === 1
                    ?
                    <Users users={users} roles={roles} links={usersData.links} />
                    :
                    <Unauthorized >
                        No tienes permisos para ingresar a esta pagina
                    </Unauthorized>
            }
        </AuthenticatedLayout>
    )
}