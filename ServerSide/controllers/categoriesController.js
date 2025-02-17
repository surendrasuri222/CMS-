

const Categories = require("../models/pageModel");

// get all categories
exports.getCategories = (req, res) => {
    Categories.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send({ error: err })
        })
}


// get latest categories
exports.getLatestCategories = (req, res) => {
    Categories.find().sort({ _id: -1 })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send({ error: err })
        })
}

// get the count
exports.getCount = async (req, res) => {
    try {
        const categories = await Categories.find();
        const categoryCounts = {};

        // Initialize counts for each category
        categories.forEach(category => {
            categoryCounts[category.category] = 0;
        });

        // Count the number of pages for each category
        const pages = await Categories.find();
        pages.forEach(page => {
            categoryCounts[page.category]++;
        });

        // Convert the counts to the desired format
        const categoriesWithCount = Object.keys(categoryCounts).map(category => ({
            _id: category, // Use the category name as the _id
            totalPages: categoryCounts[category]
        }));

        res.status(200).json(categoriesWithCount);
    } catch (err) {
        res.status(400).send({ error: err });
    }
};