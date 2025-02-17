
const userModel = require("../models/usermodel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function userSignin(req, res) {
    try {
        const { email, password } = req.body
        // checking validation from server
        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false
            })
        }
        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                error: true,
                success: false
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not available",
                error: true,
                success: false
            })
        }

        // Compare password hashes
        bcrypt.compare(password, user.password, function (err, passwordMatch) {
            //passwordMatch is true
            if (err) {
                return res.status(400).json({
                    message: "Check your password",
                    error: true,
                    success: false
                })
            }

            if (!passwordMatch) {
                return res.status(400).json({
                    message: "Incorrect password",
                    error: true,
                    success: false
                })
            }

            const payload = {
                _id: user._id,
                email: user.email,
                isAdmin: user.isAdmin
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '7d'
            })

            res.status(200).json({
                token: token,
                error: false,
                success: true,
                message: "Login successfully"
            })
        })

    } catch (err) {
        res.status(500).json({
            message: err.message,
            error: true,
            success: false
        })
    }
}


module.exports = userSignin


