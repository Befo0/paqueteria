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
    ],
    2: [
        {
            route: 'registrar', label: 'Registrar paquete'
        }
    ],
    3: [
        {
            route: 'paquetes.mostrar', label: 'Paquetes'
        }
    ]
}