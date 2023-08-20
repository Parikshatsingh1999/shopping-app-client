import { Link, useLocation } from "react-router-dom"
import "./Side-Panel.css"
import { useMemo } from "react"

const AdminSidePanel = () => {

    const location = useLocation();

    const panelList = useMemo(() => {
        return [
            {
                name: "Profile",
                path: ""
            },
            {
                name: "Collections",
                path: "collections"
            },
            {
                name: "Products",
                path: "products"
            },
            {
                name: "Users",
                path: "users"
            }
        ]
    }, [])

    const isCurrent = (path) => {
        if (!path && location.pathname === "/admin") {
            return true;
        } else if (!path) {
            return false;
        }
        return location.pathname.includes(path)
    }

    return (
        <div className='side-panel'>
            <div className='wrapper'>
                <div className="panel-list">
                    <ul>
                        {
                            panelList?.map(list => (
                                <li key={`list-${list.path}`}>
                                    <Link to={list.path}
                                        className={`btn-link ${isCurrent(list.path) ? 'active' : ''}`}>
                                        {list.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default AdminSidePanel
