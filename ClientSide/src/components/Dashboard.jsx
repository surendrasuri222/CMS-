
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getSortedPages } from '../apiService/pageApiService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';

const Dashboard = () => {

    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryCounts, setCategoryCounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();


    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getSortedPages();
                setPages(response);
            } catch (error) {
                console.error("Error fetching Pages:", error.message);
            }
        };
        fetchData([currentPage]);
    }, [currentPage]);

    useEffect(() => {
        // Fetching the data using axios
        axios.get("http://localhost:4000/api/categories/id")
            .then((categories) => {
                console.log(categories.data);
                // Filter out duplicate categories
                const uniqueCategories = Array.from(new Set(categories.data.map(category => category.category)));
                setCategories(uniqueCategories);
                // console.log("Categories" + categories.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    useEffect(() => {
        // Fetching the data using axios
        axios.get("http://localhost:4000/api/categories/count")
            .then((count) => {
                console.log(count.data);
                const countsMap = count.data.reduce((map, categoryCount) => {
                    map[categoryCount._id] = categoryCount.totalPages;
                    return map;
                }, {});

                // Update the category counts while preserving sorting order
                const updatedCounts = categories.map(category => ({ _id: category, totalPages: countsMap[category] || 0 }));

                setCategoryCounts(updatedCounts);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [categories]);


    return (
        <>
            <section>
                <div className="container shadow-lg p-3 mb-5 bg-white rounded p-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <h1 className="page-header">
                                    <i className="glyphicon glyphicon-dashboard"></i> Dashboard
                                </h1>

                                <div className="col-md-12">
                                    <h3>Latest Pages</h3>
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Page Title</th>
                                                <th>Category</th>
                                                <th>Author</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {pages.map((item) => (
                                                <tr key={item._id}>
                                                    <td><NavLink to={`/page/${item._id}`}>{item.PageTitle}</NavLink></td>
                                                    <td>{item.category}</td>
                                                    <td>{item.author}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <NavLink className="btn btn-default" to="/pages">View All Pages</NavLink>
                                    <hr />







                                </div>

                                <div className="col-md-12">
                                    <h3>Latest Categories</h3>
                                    <table id="sort-table" className="table table-striped tablesorter table-hover">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Category Title
                                                </th>
                                                <th className='text-center'>
                                                    Total Pages
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                categories.map((category, index) => (
                                                    <tr key={index} className='p-2'>
                                                        <td>{category}</td>
                                                        <td className='text-center'>{categoryCounts[index] ? categoryCounts[index].totalPages : 0}</td>
                                                    </tr>
                                                ))
                                            }



                                        </tbody>
                                    </table>
                                    <NavLink className="btn btn-default" to="/categories">View All Categories</NavLink>
                                    <hr />
                                </div>

                            </div>
                        </div>
                    </div>
                </div >
            </section >

            <Footer />
        </>
    );
};

export default Dashboard;
