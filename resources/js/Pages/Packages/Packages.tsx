import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import Header from "@/Components/Header"
import PackagesForm from "@/Components/Forms/PackagesForm"
import { type Packages } from "@/types/packages"

export default function Packages({packages}: {packages: Packages}) {

    return (
        <AuthenticatedLayout
            header={
                <Header>
                    Paquetes recibidos 
                </Header>
            }
        >
            <Head title="Paquetes" />
            <PackagesForm packages={packages} />
        </AuthenticatedLayout>
    )
}