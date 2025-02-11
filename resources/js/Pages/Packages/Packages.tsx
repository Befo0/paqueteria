import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, usePage } from "@inertiajs/react"
import Header from "@/Components/Header"
import ListOfPackages from "@/Components/ListOfPackages"
import { PageProps } from "@/types"
import Unauthorized from "@/Components/Unauthorized"

export default function Packages() {
    const user = usePage<PageProps>().props.auth.user

    return (
        <AuthenticatedLayout
            header={
                <Header>
                    Paquetes recibidos
                </Header>
            }
        >
            <Head title="Paquetes" />
            {
                user.id === 1 || user.id === 3
                    ?
                    <ListOfPackages />
                    :
                   <Unauthorized /> 
            }
        </AuthenticatedLayout>
    )
}