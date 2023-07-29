import "./Login.css"

import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FetchBuilder } from '../services/FetchBuidler';
import { useDispatch } from "react-redux";
import { setLogIn } from "../store/login/loginSlice";
import { alertMessage } from "../helpers/alerts";

const Login = () => {

    const dispatch = useDispatch();
    const [isLogging, setIsLogging] = useState(true);
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef()

    const dispatchLogin = (value) => {
        const data = {
            setLogin: value,
            token: ""
        }
        dispatch(setLogIn(data));
        alertMessage("You logged In Successfully");
    }

    const userSignUp = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        if (email && password && firstName && lastName) {
            FetchBuilder("users", { payload: { email, password, firstName, lastName }, method: "POST" }).then(res => {
                if (res && !res.error) {
                    dispatchLogin(true)
                    navigate("/");
                } else if (res?.error) {
                    alertMessage(res.error);
                }
            }).catch(error => {
                console.error(error?.message || "Error while Signing Up user");
                alertMessage(error?.message || "Error while Signing Up user")
            })
        }
    }

    const userLogin = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (email && password) {
            FetchBuilder("login", { payload: { email, password }, method: "POST" }).then(res => {
                if (res && !res.error) {
                    dispatchLogin(true)
                    navigate("/");
                } else if (res?.error) {
                    alertMessage(res.error);
                }
            }).catch(error => {
                console.error(error?.message || "Error while loggin user");
                alertMessage(error?.message || "Error while loggin user");
            })
        }
    }

    return (
        <div className='login-form'>
            {!!isLogging && <div> <form onSubmit={userLogin}>
                <h4> LogIn Form </h4>
                <div className='form-item'>
                    <label htmlFor='email' >Email</label>
                    <input id="email" ref={emailRef} required type='text' placeholder='Enter Email' />
                </div>
                <div className='form-item'>
                    <label htmlFor='password'>Pasword</label>
                    <input ref={passwordRef} id="password" required type='password' placeholder='Enter password' />
                </div>
                <div> <button type='submit'> Login </button> </div>
                <p className="info-line"> Not a user, <span onClick={() => setIsLogging(false)}> Sign Up </span>  here  </p>
            </form>
            </div>
            }

            {!isLogging && <div> <form onSubmit={userSignUp}>
                <h4> SignUp Form </h4>
                <div className='form-item'>
                    <label htmlFor='firstname' >First Name</label>
                    <input id="firstname" ref={firstNameRef} required type='text' placeholder='Enter First Name' />
                </div>
                <div className='form-item'>
                    <label htmlFor='lastname' >Last Name</label>
                    <input id="lastname" ref={lastNameRef} required type='text' placeholder='Enter Last Name' />
                </div>
                <div className='form-item'>
                    <label htmlFor='email' >Email</label>
                    <input id="email" ref={emailRef} required type='text' placeholder='Enter Email' />
                </div>
                <div className='form-item'>
                    <label htmlFor='password'>Pasword</label>
                    <input ref={passwordRef} id="password" required type='password' placeholder='Enter password' />
                </div>
                <div> <button type='submit'> Sign Up </button> </div>
                <p className="info-line"> ALready a user, <span onClick={() => setIsLogging(true)}> Login </span> here  </p>
            </form>
            </div>
            }

        </div>
    )
}

export default Login
