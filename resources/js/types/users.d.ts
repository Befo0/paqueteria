export type Users = [
    {
        id: number,
        name: string
    }
]

export interface adminUsers {
    id: number,
    name: string,
    email: string,
    rol: string,
    isActive: number
}

export interface UsersPagination {
    current_page:   number;
    data:           adminUsers[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          UserLink[];
    next_page_url:  null;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface UserLinks {
    url:    null | string;
    label:  string;
    active: boolean;
}

