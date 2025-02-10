export interface Package {
    current_page:   number;
    data:           Data[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          PaginationLink[];
    next_page_url:  null;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface Data {
    id:                 number;
    nombrePaquete:      string;
    descripcionPaquete: string;
    remitente:          string;
    horaLlegadaPaquete: string;
    usuarioRecibio:     string;
}

export interface PaginationLink {
    url:    null | string;
    label:  string;
    active: boolean;
}

export interface newPackage {
    id: number,
    titulo: string,
    remitente: string,
    destinatario: number,
    recepcion: number,
}