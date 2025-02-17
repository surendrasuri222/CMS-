import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getPage } from '../apiService/pageApiService';
import axios from 'axios';
import Footer from './Footer'
import { jwtDecode } from "jwt-decode";


const Pages = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        if (token) {
            setIsAdminLoggedIn(jwtDecode(token).isAdmin);
            console.log(jwtDecode(token).isAdmin)
        } else {
            setIsAdminLoggedIn(false); // Set isAdminLoggedIn to false if token is not present
        }
    }, [token]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPage();
                setPages(response);
            } catch (error) {
                console.error("Error fetching Pages:", error.message);
            }
        };
        fetchData([currentPage]);
    }, [currentPage]);

    //pagination
    const itemsToShow = 5;
    const totalItems = pages.length;
    const totalPages = Math.ceil(totalItems / itemsToShow);
    const startIndex = (currentPage - 1) * itemsToShow;
    const endIndex = startIndex + itemsToShow;
    const displayedPages = pages.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const deleteHandler = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/page/${id}`);
            setPages(pages.filter((page) => page._id !== id)); // Update pages state
            alert(`Page deleted successfully`);
            navigate("/pages");
        } catch (err) {
            console.error(`Error deleting the page: ${err.message}`);
        }
    };

    const handleNew = () => {
        navigate("/page/new");
    };

    const editHandler = (id) => {
        // Redirect to the edit page form with the page ID
        navigate(`/pages/edit/${id}`);
    };


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
                                                <i className="glyphicon glyphicon-file"></i> Pages
                                            </div>
                                            <div className="col xs={6} sm={6} md={6} lg={6} d-flex flex-row-reverse">
                                                <button className="btn btn-primary shadow-lg" onClick={handleNew} ><i className="glyphicon glyphicon-plus"></i>New</button>
                                            </div>
                                        </div>
                                    </h1>
                                </div>

                                <ol className="breadcrumb">
                                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                                    <li className="active">Pages</li>
                                </ol>

                                <table id="sort-table" className="table table-striped tablesorter mx-auto">
                                    <thead>
                                        <tr>
                                            <th >Page Title <i className="glyphicon glyphicon-chevron-down"></i></th>
                                            <th >Category <i className="glyphicon glyphicon-chevron-down"></i></th>
                                            <th >Author <i className="glyphicon glyphicon-chevron-down"></i></th>

                                            {isAdminLoggedIn ? (<th >Actions <i className="glyphicon glyphicon-chevron-down"></i></th>) : (<span></span>)}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedPages.map((item) => (
                                            <tr key={item._id}>
                                                <td><Link to={`/page/${item._id}`}>{item.PageTitle}</Link></td>
                                                <td>{item.category}</td>
                                                <td>{item.author}</td>
                                                {isAdminLoggedIn ? (<td>
                                                    <button className="btn btn-default bi bi-pencil-square p-2 me-2" onClick={() => editHandler(item._id)}></button>
                                                    <button onClick={() => deleteHandler(item._id)} className='btn btn-default bi bi-trash3-fill p-2'></button>
                                                </td>) : (<span></span>)}

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

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
            </section>
            <Footer />
        </>
    );
};

export default Pages;