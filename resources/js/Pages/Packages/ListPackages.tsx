import { Head, usePage } from "@inertiajs/react"
import Header from "@/Components/Header"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import ListPackagesReception from "@/Components/Tables/ListPackagesReception"
import { Package } from "@/types/packages"
import { PageProps } from "@/types"
import Unauthorized from "@/Components/Unauthorized"

export default function ListPackages({ registeredPackages }: { registeredPackages: Package }) {

    const user = usePage<PageProps>().props.auth.user

    return (
        <Authenticated
            header={
                <Header>
                    Registro de paquetes
                </Header>
            }
        >
            <Head title="Registro" />
            {
                user.idRol === 2 || user.idRol === 1
                    ?
                    <ListPackagesReception registeredPackages={registeredPackages.data} links={registeredPackages.links} user={user} />
                    :
                    <Unauthorized>
                        No tienes permisos para ingresar a esta pagina
                    </Unauthorized>
            }

        </Authenticated>
    )
}