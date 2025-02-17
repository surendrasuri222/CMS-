const { response } = require('express')
const Page = require('../models/pageModel')
exports.GetPage = (req, res) => {
    Page.find()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).send({ error: err }))
}

// get latest pages
exports.getLatestPages = (req, res) => {
    Page.find().sort({ _id: -1 }).limit(5)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send({ error: err.message })
        })
}


exports.createPage = (req, res) => {
    const NewPage = req.body;
    if (NewPage != null) {
        Page.create(NewPage)
            .then((data) => res.status(201)
                .send("Page created successfully"))
            .catch((err) => {
                res.status(400).send({ error: err })
            })
    }
    else {
        res.status(400).send("page not created")
    }
}
exports.updatePage = (req, res) => {
    const id = req.params.id;
    const modifiedValue = req.body;
    Page.findByIdAndUpdate(id, modifiedValue)
        .then((data) => res.status(204).send(data))
        .catch((err) => res.status(404).send(err => "Item not found" + err))
}
exports.DeletePage = (req, res) => {
    const id = req.params.id;
    Page.findByIdAndDelete(id).then(() => res.status(201).send("deleted sucessfuly"))
        .catch(err => res.status(404).send(err => "id not found" + err))


}

exports.getBookById = (req, res) => {
    const id = req.params.id;
    if (id != null) {
        Page.findById(id)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).send({ error: err }))
    }
    else {
        res.status(401).send(`Book Id:${id} doesnot exist`)
    }
}