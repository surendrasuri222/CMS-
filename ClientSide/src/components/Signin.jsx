
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../css/index.css';
import '../css/App.css';

function Signin() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    console.log("data", data)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/', {
                method: 'post',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(data)
            });

            const dataResponse = await response.json();

            if (dataResponse.error) {
                toast.error(dataResponse.message);
            }

            if (dataResponse.success) {
                toast.success(dataResponse.message);
                localStorage.setItem('token', dataResponse.token);
                navigate('/dashboard');
                window.location.reload();
            }
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('An error occurred while processing your request.');
        }
    };

    const handleShowPasswordToggle = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="h-screen-center">
            <div className="card-form">
                <div className='card-header'>
                    <div className='lock-icons'>
                        <i className="fa-solid fa-lock"></i>
                    </div>
                </div>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='form-element'>
                        <label htmlFor="email">Email</label>
                        <div className="input-container">
                            <input type='email' placeholder="Enter your Email" value={data.email} name="email" disabled={loading} onChange={handleOnChange} />
                        </div>
                    </div>
                    <div className='form-element'>
                        <label htmlFor="password">Password</label>
                        <div className="input-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={data.password}
                                disabled={loading}
                                onChange={handleOnChange}
                                className="form-control"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="showPassword"
                            className="check"
                            onChange={handleShowPasswordToggle}
                        />
                        <label htmlFor="showPassword" className="form-check-label"> &nbsp; Show Password</label>
                    </div>
                    <button className="btn-sign" >{loading ? "Loading..." : "Sign in"}</button>
                    <p>Don't have an account?<NavLink to="/signup" className="link"> Sign Up</NavLink></p>

                </form>
            </div>
        </div>
    );
}

export default Signin;

