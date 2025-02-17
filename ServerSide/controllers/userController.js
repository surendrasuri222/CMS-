const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require('bcryptjs');

// get all users
exports.getUsers = (req, res) => {
    User.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send({ error: err })
        })
}

// get latest users
exports.getLatestUsers = (req, res) => {
    User.find().sort({ _id: -1 }).limit(5)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send({ error: err })
        })
}

// get user by id
exports.getUserById = (req, res) => {
    const id = req.params.id;
    if (id != null) {
        User.findById(id)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(400).send({ error: err })
            })
    }
    else {
        res.status(401).send(`User with id ${id} does not exist`);
    }

}

// get user by id and delete
exports.getUserByIdAndDelete = (req, res) => {
    const id = req.params.id;
    if (id != null) {
        User.findByIdAndDelete(id)
            .then((data) => {
                res.status(204).send(`User deleted successfully`)
            })
            .catch((err) => {
                res.status(400).send({ error: err })
            })
    }
    else {
        res.status(401).send(`User does not exist`)
    }
}

// create a new user
exports.createUser = async (req, res) => {
    const newUser = req.body;
    if (newUser != null) {
        try {

            const user = await User.findOne({ email: newUser.email })

            if (user) {
                // console.log(`User already exists`)
                // alert(`User already exists`)
                return res.status(400).send(`User already exists`)
            }


            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(newUser.password, salt);

            const userWithHashedPassword = {
                ...newUser,
                password: hashedPassword
            };

            const createdUser = await User.create(userWithHashedPassword);
            res.status(201).send("User created successfully");
        } catch (err) {
            res.status(400).send({ error: err });
        }
    } else {
        res.status(400).send("User cannot be created");
    }
}


// delete the user if isAdmin: true

exports.deleteUser = (req, res) => {
    const id = req.params.id;

    // Retrieve the JWT token from the request headers
    const token = req.headers.authorization.split(" ")[1]

    // Decode the token to get user information including the isAdmin field
    const decodedToken = jwt.verify(token, "CMSTeam")

    if (decodedToken.isAdmin) {
        User.findByIdAndDelete(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send(`User with id ${id} not found`);
                }
                else {
                    res.status(200).send(`User deleted successfully with id ${id}`);
                }
            })
            .catch((err) => {
                res.status(400).send({ error: err })
            })
    }
    else {
        res.status(401).send('Unauthorized: Only admin can delete users');
    }
}
