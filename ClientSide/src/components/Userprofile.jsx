import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Footer from './Footer';

function Userprofile() {
    const [data, setData] = useState({
        name: "",
        email: "",
        role: "",
        gender: "",
        age: 0
    })
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [])

    const handleUserProfile = async () => {
        const response = await fetch('http://localhost:4000/api/userprofile', {
            method: "post",
            headers: {
                "content-type": "application/json",
                authorization: `jwt ${localStorage.getItem('token')}`
            }
        })

        const dataResponse = await response.json()
        setData(dataResponse.data)
    }

    useEffect(() => {
        if (token) {
            handleUserProfile()
        }
    }, [])

    return (

        <>
            <section>
                <div class="container shadow-lg p-3 mb-5 bg-white rounded p-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="book-header">
                                        <div className="row">
                                            <div className=" col xs={6} sm={6} md={6} lg={6}">
                                                <i className="glyphicon glyphicon-file"></i> Welcome {data?.name} !!
                                            </div>
                                            <div className="col xs={6} sm={6} md={6} lg={6} d-flex flex-row-reverse">
                                                <NavLink to={`/userprofile/edit/${data._id}`}><button type="button" className="btn btn-primary shadow-lg"><i className="bi bi-pencil-square"></i> Edit</button></NavLink>
                                            </div>
                                        </div>
                                    </h1>
                                </div>



                                <ol class="breadcrumb">
                                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                                    <li class="active">Profile</li>
                                </ol>



                                <div className="row">


                                    <div className="col-md-6">


                                        <p><strong>Name:</strong> {data?.name}</p>
                                        <p><strong>Email:</strong> {data?.email}</p>
                                        <p><strong>Role:</strong> {data?.role}</p>
                                        <p><strong>Gender:</strong> {data?.gender}</p>
                                        <p><strong>Age:</strong> {data?.age}</p>

                                    </div>


                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <Footer />

        </>
    )
}

export default Userprofile



