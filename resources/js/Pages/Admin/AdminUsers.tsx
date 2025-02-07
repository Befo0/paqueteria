import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import Header from "@/Components/Header"
import { usePage } from "@inertiajs/react"
import { PageProps } from "@/types"

export default function AdminUsers(){
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
                <div>
                    to do
                </div>
                :
                <div>
                    No tienes permisos para ingresar a esta pagina.
                </div>
            }
       </AuthenticatedLayout> 
    )
}