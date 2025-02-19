import { Head, usePage } from "@inertiajs/react"
import Header from "@/Components/Header"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import HistoryPackages from "@/Components/Tables/HistoryPackages"
import { Package } from "@/types/packages"
import { PageProps } from "@/types"
import Unauthorized from "@/Components/Unauthorized"

export default function History({ historyPackages }: { historyPackages: Package }) {
    const user = usePage<PageProps>().props.auth.user

    return (
        <Authenticated
            header={
                <Header>
                    Historial de paquetes
                </Header>
            }
        >
            <Head title="Historial" />
            {
                user.idRol === 1 || user.idRol === 3
                    ?
                    <HistoryPackages history={historyPackages.data} links={historyPackages.links} user={user} />
                    :
                    <Unauthorized>
                        No tienes permisos para ingresar a esta pagina
                    </Unauthorized>
            }

        </Authenticated>
    )
}