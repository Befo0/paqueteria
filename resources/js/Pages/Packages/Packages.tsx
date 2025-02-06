import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import Header from "@/Components/Header"
import ListOfPackages from "@/Components/ListOfPackages"

export default function Packages() {

    return (
        <AuthenticatedLayout
            header={
                <Header>
                    Paquetes recibidos 
                </Header>
            }
        >
            <Head title="Paquetes" />
            <ListOfPackages />
        </AuthenticatedLayout>
    )
}