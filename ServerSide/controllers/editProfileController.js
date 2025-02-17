const userModel = require("../models/usermodel")

exports.updateUser = (req, res) => {
    const id = req.params.id;
    const modifiedValue = req.body;
    userModel.findByIdAndUpdate(id, modifiedValue)
        .then((data) => res.status(204).send(data))
        .catch((err) => res.status(404).send(err => "Item not found" + err))
}
exports.getUserById = (req, res) => {
    const id = req.params.id;
    if (id != null) {
        userModel.findById(id)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).send({ error: err }))
    }
    else {
        res.status(401).send(`Book Id:${id} doesnot exist`)
    }
}