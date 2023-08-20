import { useEffect, } from 'react'
import AdminSidePanel from './SidePanel/AdminSidePanel'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import "./Admin-page.css"

const AdminPage = () => {

    const navigate = useNavigate()
    const admin = useSelector(state => state.admin);

    useEffect(() => {
        if (!admin) {
            navigate("/");
        }
    }, [admin, navigate])

    return (
        <div className='admin-page'>{
            admin && <>
                <AdminSidePanel />
                <div className='admin-main-wrapper'>
                    <Outlet />
                </div>
            </>
        }
        </div>
    )
}

export default AdminPage
