import Authenticated from "@/Layouts/AuthenticatedLayout"
import Header from "@/Components/Header"
import { Head, usePage } from "@inertiajs/react"
import { PageProps } from "@/types"
import { newPackage } from "@/types/packages"
import ReceivePackage from "@/Components/Forms/ReceivePackage"

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
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    Este paquete no te pertenece
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <ReceivePackage newPackage={newPackage} />
            }
        </Authenticated>
    )
}