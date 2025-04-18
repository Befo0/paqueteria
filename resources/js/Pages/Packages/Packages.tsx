import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, usePage } from "@inertiajs/react"
import Header from "@/Components/Header"
import ListOfPackages from "@/Components/Tables/ListOfPackages"
import { PageProps } from "@/types"
import Unauthorized from "@/Components/Unauthorized"
import { Package } from "@/types/packages"

export default function Packages({ registeredPackages }: { registeredPackages: Package }) {
    const user = usePage<PageProps>().props.auth.user
    return (
        <AuthenticatedLayout
            header={
                <Header>
                    'Paquetes recibidos'
                </Header>
            }
        >
            <Head title="Paquetes" />
            {
                user.idRol === 1 || user.idRol === 3
                    ?
                    <ListOfPackages packages={registeredPackages.data} links={registeredPackages.links} />
                    :
                    <Unauthorized >
                        No tienes permisos para ingresar a esta pagina
                    </Unauthorized>
            }
        </AuthenticatedLayout>
    )
}