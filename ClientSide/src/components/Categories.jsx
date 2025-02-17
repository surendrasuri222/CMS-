
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Categories() {
    const [categories, setCategories] = useState([]);

    const [categoryCounts, setCategoryCounts] = useState([]);
    const token = localStorage.getItem("token")
    const navigate = useNavigate();

    useEffect(() => {
        // Fetching the data using axios
        axios.get("http://localhost:4000/api/categories/count")
            .then((count) => {
                console.log(count.data);
                setCategoryCounts(count.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        // Fetching the data using axios
        axios.get("http://localhost:4000/api/categories")
            .then((categories) => {
                console.log(categories.data);
                // Filter out duplicate categories
                const uniqueCategories = Array.from(new Set(categories.data.map(category => category.category)));
                setCategories(uniqueCategories);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <section>
                <div className="container shadow-lg p-3 mb-5 bg-white rounded p-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                                    <h1 className="book-header">
                                        <i className="glyphicon glyphicon-folder-open"></i> Categories
                                    </h1>
                                </div>
                            </div>
                            <ol className="breadcrumb">
                                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                                <li className="active">Categories</li>
                            </ol>
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

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}


