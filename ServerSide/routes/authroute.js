const express = require('express')
const router = express.Router()

const userSignUp = require('../controllers/userSignUp')
const userSignin = require('../controllers/userSignin')
const userProfile = require('../controllers/userProfile')
const verifyToken = require('../middleware/verifyToken')

//router
router.post("/signup", userSignUp)
router.post('/', userSignin)
router.post('/userprofile', verifyToken, userProfile)

module.exports = router