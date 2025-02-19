import { Head, usePage } from "@inertiajs/react"
import Header from "@/Components/Header"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import ListOfDeleted from "@/Components/Tables/ListOfDeleted"
import { Package } from "@/types/packages"
import { PageProps } from "@/types"
import Unauthorized from "@/Components/Unauthorized"

export default function DeletedPackages({ deletedPackages }: { deletedPackages: Package }) {
    const user = usePage<PageProps>().props.auth.user

    return (
        <Authenticated
            header={
                <Header>
                    Paquetes eliminados
                </Header>
            }
        >
            <Head title="Paquetes eliminados" />
            {
                user.idRol === 1 || user.idRol === 3
                    ?
                    <ListOfDeleted deleted={deletedPackages.data} links={deletedPackages.links} />
                    :
                    <Unauthorized>
                        No tienes permisos para ingresar a esta pagina
                    </Unauthorized>
            }

        </Authenticated>
    )
}