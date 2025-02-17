import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from "axios";
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';



const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [])


    useEffect(() => {

        // Fetching the data using axios
        axios.get("http://localhost:4000/api/users")
            .then((users) => {
                setUsers(users.data)
                // console.log(users)
            })
            .catch((err) => {
                console.log(err);
            })
        // console.log(users)



    }, [])

    // deleting the user
    const deleteHandler = (id) => {
        if (window.confirm(`Are you sure you want to delete this user?`)) {
            axios.delete(`http://localhost:4000/api/users/${id}`)
                .then((response) => {
                    setUsers(users.filter((user) => {
                        return user._id !== id;
                    }))
                    alert(`User deleted successfully`)
                    console.log(`User with id ${id} has been deleted`)
                })
                .catch((err) => {
                    console.log(`Error deleting the user`)
                })
        }
    }


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const itemsToShow = 5;
    const totalItems = users.length;
    const totalPages = Math.ceil(totalItems / itemsToShow);
    const startIndex = (currentPage - 1) * itemsToShow;
    const endIndex = startIndex + itemsToShow;
    const displayedUsers = users.slice(startIndex, endIndex);


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
                                                <i className="glyphicon glyphicon-file"></i> Users
                                            </div>
                                            <div className="col xs={6} sm={6} md={6} lg={6} d-flex flex-row-reverse">
                                                <NavLink to="/users/add"><button type="button" class="btn btn-primary shadow-lg"><i className="glyphicon glyphicon-plus"></i> New</button></NavLink>
                                            </div>
                                        </div>
                                    </h1>
                                </div>


                            </div>

                            <ol class="breadcrumb">
                                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                                <li class="active">Users</li>
                            </ol>

                            <table id="sort-table" class="table table-striped tablesorter table-hover">
                                <thead>
                                    <tr>

                                        <th >Full Name <i class="glyphicon glyphicon-chevron-down"></i></th>
                                        <th >Email <i class="glyphicon glyphicon-chevron-down"></i></th>
                                        <th >Group <i class="glyphicon glyphicon-chevron-down"></i></th>
                                        <th>Action <i class="glyphicon glyphicon-chevron-down"></i></th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        displayedUsers.map((user) => {
                                            return (
                                                <tr className='p-2'>
                                                    <td><NavLink to={`/users/user/${user._id}`}>{user.name}</NavLink></td>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>
                                                    <td><button className='btn btn-default bi bi-trash3-fill p-2' onClick={() => deleteHandler(user._id)}></button></td></tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-center h-2 ">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination">
                                        <li>
                                            <a href="#" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)}>
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>
                                        {Array.from({ length: totalPages }).map((_, index) => (
                                            <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                                                <a href="#" onClick={() => handlePageChange(index + 1)}>
                                                    {index + 1}
                                                </a>
                                            </li>
                                        ))}
                                        <li>
                                            <a href="#" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)}>
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                        </div>
                    </div>
                </div>

            </section >

            <Footer />
        </>
    )
}

export default Users