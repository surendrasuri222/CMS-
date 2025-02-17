import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const NewAndEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:4000/api/page';
    const [formData, setFormData] = useState({
        PageTitle: '',
        category: '',
        author: '',
        description: ''
    });

    // Fetch page details in edit mode
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    //edit mode if id as a parameter
                    const response = await axios.get(`${baseUrl}/${id}`);
                    setFormData(response.data);
                }
            } catch (error) {
                console.error('Error fetching page details:', error.message);
            }
        };

        fetchData();
    }, [baseUrl, id]);

    const handleChange = (e) => {
        setFormData((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                //PUT request in edit
                await axios.put(`${baseUrl}/${id}`, formData);
                alert('Page updated successfully');
                navigate('/pages'); // Redirect to the pages
            } else {
                // POST request
                await axios.post(baseUrl, formData);
                alert('Page created successfully');
                navigate('/pages'); // Redirect to the pages
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <>
            <div className="border border dark rounded container-fluid w-50 shadow-lg p-3 mb-5 bg-white rounded">
                <h1>{id ? 'Edit Page' : 'Create Page'}</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="pageTitle" className="col-form-label">Page Title</label>
                    <input type="text" className="form-control" id="pageTitle" name="PageTitle" value={formData.PageTitle.charAt(0).toUpperCase() + formData.PageTitle.slice(1)} onChange={handleChange} required />

                    <label htmlFor="category" className="col-form-label">Category</label>
                    <input type="text" className="form-control" id="category" name="category" value={formData.category.charAt(0).toUpperCase() + formData.category.slice(1)} onChange={handleChange} required />
                    <div className="form-group">
                        <label htmlFor="author" className="col-form-label">Author</label>
                        <input type="text" className="form-control" id="author" name="author" value={formData.author.charAt(0).toUpperCase() + formData.author.slice(1)} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="col-form-label">Description</label>
                        <textarea id="description" className="form-control" rows={10} cols={20} name="description" value={formData.description.charAt(0).toUpperCase() + formData.description.slice(1)} onChange={handleChange} required></textarea>
                    </div>

                    <div className="container-fluid d-flex flex-row-reverse ">
                        <button type="submit" className="btn btn-primary">
                            {id ? 'Update Page' : 'Add Page'}
                        </button>
                        <button className="btn btn-secondary me-2" onClick={() => navigate('/pages')}>
                            Cancel
                        </button>


                    </div>
                </form>
            </div>
        </>
    );
};

export { NewAndEdit };