import "./Admin.css";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createRequest } from '../services/FetchBuidler';
import { useDispatch } from "react-redux";
import { updateAdmin } from "../store/admin/AdminSlice";
import AdminPage from "../components/Admin/AdminPage";


const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = useSelector(state => state.login);
    const [isAdmin, setAdmin] = useState(null);

    useEffect(() => {
        if (!login || !login.isLoggedIn || !login.token) {
            navigate("/login");
        } else {
            createRequest.fetch("auth/access").then(res => {
                if (res.user) {
                    setAdmin(res.user);
                    dispatch(updateAdmin({ user: res.user }))
                } else {
                    setAdmin(false);
                }
            })
        }
    }, [navigate, login, login.isLoggedIn, login.token, dispatch]);

    return (
        <div>
            {
                isAdmin === false && <div >
                    <h2 className='not-authorized'> Not Authorized </h2>
                    <p> Please <Link className="btn-link link" to="/login"> Login </Link> with right creds </p>
                </div>
            }
            {!!isAdmin &&
                <div className='admin-box'>
                    <h2 className="heading"> Admin </h2>
                    <AdminPage />
                </div>
            }
        </div>
    )
}

export default Admin
