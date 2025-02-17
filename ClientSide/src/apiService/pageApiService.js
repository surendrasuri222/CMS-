

import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/page';

// To get the data of all pages in database
const getPage = async () => {
    try {
        const response = await axios.get(`${baseUrl}`);
        if (response.status === 200) {
            return response.data;

        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching page:", error.message);
        return null;
    }
};

const getSortedPages = async () => {
    try {
        const response = await axios.get(`${baseUrl}/id`);
        if (response.status === 200) {
            return response.data;

        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching page:", error.message);
        return null;
    }
};

//to post a Page
export const postPage = async (formData) => {
    try {
        const response = await axios.post(`${baseUrl}`, formData);
        return response.data;
    } catch (error) {
        throw new Error('Error occured');
    }
};

// To get the data whenever user wants to get particular page data
const getOnePage = async (id) => {
    try {
        const url = `${baseUrl}/${id}`;
        const response = await axios.get(url);

        if (response.status === 200) {
            const book = response.data;
            return book;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching page:', error.message);
        throw error;
    }
};


// delete page through Id
const deletePage = async (id) => {
    const url = `${baseUrl}/${id}`;

    try {
        const response = await axios.delete(url);

        if (response.status === 204) {
            console.log(`Page with id ${id} deleted successfully.`);
        } else {
            console.error(`Error deleting page with id ${id}: ${response.statusText}`);
            throw new Error(`Error deleting page with id ${id}`);
        }
    } catch (error) {
        console.error('Error deleting page:', error.message);
        throw error;
    }
};



export { getPage, getSortedPages, getOnePage, deletePage };