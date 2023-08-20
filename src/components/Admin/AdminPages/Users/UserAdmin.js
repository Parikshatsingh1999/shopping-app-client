import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { createRequest } from '../../../../services/FetchBuidler';

const UserAdmin = () => {

    const navigate = useNavigate();
    const { userId } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!userId) {
            navigate("/admin");
            return;
        }
        const path = `users/${userId}`;
        createRequest.fetch(path).then((res) => {
            if (!res.error) {
                setUser(res);
            } else {
                setUser(false)
            }
        }).catch(error => {
            console.error(error.message);
            setUser(false)
        });
    }, [userId, navigate])


    return (
        <div>
            {
                user === null && <div>
                    <p> Loading... </p>
                </div>
            }
            {
                user === false && <div>
                    Something went wrong, Please try again later
                </div>
            }
            {
                !!user && <div>
                    <div className="user-profile">
                        <form>
                            <div className="form-element">
                                <label> First Name : </label> <input value={user.firstName} onChange={e => { }} />
                            </div>
                            <div className="form-element">
                                <label> Last Name : </label> <input value={user.lastName} onChange={e => { }} />
                            </div>
                            <div className="form-element">
                                <label> Email : </label> <input disabled value={user.email} onChange={e => { }} />
                            </div>
                        </form>
                    </div>
                </div >
            }
        </div >
    )
}

export default UserAdmin
