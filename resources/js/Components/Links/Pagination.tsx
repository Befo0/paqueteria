import { PaginationLink } from "@/types/packages"
import { Link } from "@inertiajs/react"

export default function Pagination({links}: {links: PaginationLink[]}) {
    return(
        <div>
            {
                links.length > 3
                &&
                <div className="flex flex-wrap justify-center">
                    {
                        links.map((link, index) => {
                            return (
                                link.url === null ? <div key={index} className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded" dangerouslySetInnerHTML={{__html : link.label}}>
                                </div>
                                :
                                <Link key={index} href={link.url} className={`mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500 ${link.active && 'bg-white'}`} dangerouslySetInnerHTML={{__html: link.label}}></Link>

                            )
                        })
                    }
                </div>
            }
        </div>
    )
}