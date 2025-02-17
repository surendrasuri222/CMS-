import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const URL = "http://localhost:4000/api/page/search?q=";

const Search = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [])

    const fetchData = async (apiURL) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(apiURL);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error.message || 'Something went wrong');
        }
        setLoading(false);
    };

    useEffect(() => {
        const correctURL = `${URL}${searchTerm}`;
        if (searchTerm.trim() !== "") {
            fetchData(correctURL);
        } else {
            setData([]);
        }
    }, [searchTerm]);

    return (
        <>
            <div className="search-container">
                <input type="text" placeholder="Search Page" className="search-input" value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="search-button" >
                    <i className="fa fa-search"></i>
                </button>

            </div>
            <div className='result-list'>
                {loading && <h3>Loading...</h3>}
                {error && <h3 style={{ color: "red" }}>{error}</h3>}
                {!loading && !error && (
                    <ul className="cocktail-data">
                        {data.map((eachdata, index) => {
                            const { PageTitle, category } = eachdata;
                            return (
                                <li key={index}>
                                    <div className="text">

                                        <p><Link to={`/page/${eachdata._id}`}>Page: {PageTitle}</Link></p>
                                        <p>category: {category}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

        </>
    );
};

export default Search;
