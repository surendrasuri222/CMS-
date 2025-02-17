import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect } from "react";

const User = () => {
    const [users, SetUsers] = useState([])
    const { id } = useParams();

    // Fetching the user based on id
    useEffect(() => {
        axios.get(`http://localhost:4000/api/users/${id}`)
            .then((data) => {
                console.log(data)
                SetUsers(data.data)
            })
            .catch((err) => {
                console.log(err)
            })
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
                                                <i className="glyphicon glyphicon-user"></i> User Details
                                            </div>
                                        </div>
                                    </h1>
                                </div>

                                <ol class="breadcrumb">
                                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                                    <li><NavLink to="/users">Users</NavLink></li>
                                    <li class="active">User Details</li>
                                </ol>



                                <div className="row">

                                    <div className="col-md-6">
                                        <p><strong>Name:</strong> {users.name}</p>
                                        <p><strong>Email:</strong> {users.email}</p>
                                        <p><strong>Gender:</strong> {users.gender}</p>
                                        <p><strong>Age:</strong> {users.age}</p>
                                        <p><strong>Group:</strong> {users.role}</p>

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

export default User;