import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import Header from "@/Components/Header"
import { usePage } from "@inertiajs/react"
import { PageProps } from "@/types"
import { adminUsers } from "@/types/users"
import ChangeRole from "@/Components/Forms/ChangeRole"
import { Roles } from "@/types/roles"

interface Props {
    users: adminUsers[],
    roles: Roles
}

export default function AdminUsers({users, roles}: Props) {
    const user = usePage<PageProps>().props.auth.user
    return (
        <AuthenticatedLayout header={
            <Header>
                Administración de usuarios
            </Header>
        }>
            {
                user.idRol === 1
                    ?
                    <div className="max-w-8xl mx-auto p-4 sm:p-6 lg:p-8">
                        <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                            <div className="p-4 sm:p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full overflow-x-auto">
                                <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg bg-white">
                                    <thead>
                                        <tr className="bg-gray-800 text-white text-left">
                                            <th className="px-6 py-3">Nombre</th>
                                            <th className="px-6 py-3">Correo</th>
                                            <th className="px-6 py-3">Rol</th>
                                            <th className="px-6 py-3 text-center">Modificar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map(user => (
                                                <tr key={user.id} className="border-b border-gray-300">
                                                    <td className="px-6 py-4">{user.name}</td>
                                                    <td className="px-6 py-4">{user.email}</td>
                                                    <td className="px-6 py-4">{user.rol}</td>
                                                    <td>
                                                        <ChangeRole user={user} roles={roles} />
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        No tienes permisos para ingresar a esta pagina.
                    </div>
            }
        </AuthenticatedLayout>
    )
}