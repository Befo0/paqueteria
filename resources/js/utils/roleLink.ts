interface linkContent {
    route: string,
    label: string,
}

export const linksByRole: Record<number, linkContent[]> = {
    1: [
        {
            route: 'registrar', label: 'Registrar paquete'
        },
        {
            route: 'paquetes.mostrar', label: 'Paquetes'
        },
        {
            route: 'registro.paquetes', label: 'Registro de paquetes'
        },
        {
            route: 'paquetes.history' , label: 'Historial de paquetes'
        }
    ],
    2: [
        {
            route: 'registrar', label: 'Registrar paquete'
        },
        {
            route: 'registro.paquetes', label: 'Registro de paquetes'
        }
    ],
    3: [
        {
            route: 'paquetes.mostrar', label: 'Paquetes'
        },
        {
            route: 'paquetes.history', label: 'Historial de paquetes'
        }
    ]
}