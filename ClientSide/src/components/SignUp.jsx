
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


function Signup() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
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

        if (data.password !== data.confirmpassword) {
            toast.error("Password and confirm password must be same !");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:4000/api/signup", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const dataResponse = await response.json();
            if (dataResponse.error) {
                toast.error(dataResponse.message);
            }

            if (dataResponse.success) {
                toast.success(dataResponse.message);
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                navigate('/');
            }
        } catch (error) {
            console.error("Error during fetch operation:", error);
            toast.error("An error occurred while processing your request");
        }

        setLoading(false);
    };



    return (
        <div className="h-screen-center">
            <div className="card-form">
                <div className='card-header'>
                    <div className='lock-icons'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" /></svg>
                    </div>
                </div>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='form-element'>
                        <label htmlFor="name">Full Name :</label>
                        <div className="input-container">
                            <input type='text' placeholder="Enter your Full Name" value={data.name.charAt(0).toUpperCase() + data.name.slice(1)} name="name" id="name" disabled={loading} onChange={handleOnChange} />
                        </div>
                    </div>
                    <div className='form-element'>
                        <label htmlFor="email">Email :</label>
                        <div className="input-container">
                            <input type='email' placeholder="Enter your Email" value={data.email} name="email" id="email" disabled={loading} onChange={handleOnChange} />
                        </div>
                    </div>
                    <div className='form-element'>
                        <label htmlFor="password">Password :</label>
                        <div className="input-container">
                            <input
                                type='password'
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
                    <div className='form-element'>
                        <label htmlFor="confirmpassword">Confirm Password :</label>
                        <div className="input-container">
                            <input
                                type='password'
                                id="confirmpassword"
                                name="confirmpassword"
                                value={data.confirmpassword}
                                disabled={loading}
                                onChange={handleOnChange}
                                className="form-control"
                                placeholder="Enter your Confirm Password"
                            />
                        </div>
                    </div>

                    <button className="btn-sign" >{loading ? "Loading..." : "Sign Up"}</button>
                    <p>Already have an account?<NavLink to="/" className="link"> Sign In</NavLink></p>

                </form>
            </div>
        </div>
    );
}

export default Signup;

