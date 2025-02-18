import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, usePage } from "@inertiajs/react"
import Header from "@/Components/Header"
import ListOfPackages from "@/Components/Tables/ListOfPackages"
import { PageProps } from "@/types"
import Unauthorized from "@/Components/Unauthorized"
import { Package } from "@/types/packages"

export default function Packages({registeredPackages}: {registeredPackages: Package}) {
    const user = usePage<PageProps>().props.auth.user
    const page = usePage<PageProps>().url
    return (
        <AuthenticatedLayout
            header={
                <Header>
                    {
                        page.includes('eliminados') 
                        ?
                        'Paquetes eliminados'
                        :
                        'Paquetes recibidos'
                    }
                </Header>
            }
        >
            <Head title="Paquetes" />
            {
                user.id === 1 || user.id === 3
                    ?
                    <ListOfPackages url={page} packages={registeredPackages.data} links={registeredPackages.links} />
                    :
                    <Unauthorized >
                        No tienes permisos para ingresar a esta pagina
                    </Unauthorized>
            }
        </AuthenticatedLayout>
    )
}