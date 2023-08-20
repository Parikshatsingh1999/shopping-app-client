import { useState, useEffect } from 'react'
import { createRequest } from '../../../../services/FetchBuidler';
import { Link } from 'react-router-dom';

const UserList = () => {

    const [users, setUsers] = useState(null);

    useEffect(() => {
        createRequest.fetch("users").then(res => {
            if (res?.length) {
                setUsers(res);
            } else {
                setUsers([])
            }
        }).catch(error => {
            console.error(error?.message);
            setUsers([]);
        })
    }, [])

    return (
        <div className='user-list'>
            {
                !users && <div>
                    Loading...
                </div>
            }
            {
                users && !users.length && <div>
                    <p><b> No Products Found </b></p>
                    <p> Add New Products </p>
                </div>
            }
            {
                users && !!users.length && <div className='list-items'>
                    <div className='wrapper'>
                        <ul>
                            {
                                users.map(user => (
                                    <li key={user.id}>
                                        <div  >
                                            <h2>
                                                <Link className='btn-link link' to={user.id}> {user.email}
                                                </Link>
                                            </h2>
                                            <p> {user.firstName} {user.lastName} </p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserList
