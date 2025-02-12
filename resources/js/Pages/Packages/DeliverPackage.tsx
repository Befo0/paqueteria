import Authenticated from "@/Layouts/AuthenticatedLayout"
import Header from "@/Components/Header"
import { Head, usePage } from "@inertiajs/react"
import { PageProps } from "@/types"
import { newPackage } from "@/types/packages"
import ReceivePackage from "@/Components/Forms/ReceivePackage"
import Unauthorized from "@/Components/Unauthorized"

export default function DeliverPackage({ newPackage }: { newPackage: newPackage }) {
    const user = usePage<PageProps>().props.auth.user

    return (
        <Authenticated
            header={
                <Header>
                    Entrega de paquete
                </Header>
            }
        >
            <Head title="Entrega de paquete" />
            {
                user.id !== newPackage.destinatario
                    ?
                    <Unauthorized>
                        Este paquete no te pertenece
                    </Unauthorized>
                    :
                    <ReceivePackage newPackage={newPackage} />
            }
        </Authenticated>
    )
}