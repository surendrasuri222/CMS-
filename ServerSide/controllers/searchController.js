
const Page = require('../models/pageModel')

const searchController = async (req, res) => {
    try {
        const { q } = req.query; // q is the query parameter for the category name
        // Find pages with category matching the search query
        const results = await Page.find({
            $or: [
                { category: { $regex: new RegExp(q, 'i') } },
                { PageTitle: { $regex: new RegExp(q, 'i') } }
            ]
        });
        res.json(results);
    } catch (error) {
        console.error('Error searching pages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = searchController

