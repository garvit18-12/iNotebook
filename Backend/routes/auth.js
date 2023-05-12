require('dotenv').config();
const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')

// Function to find user by email
User.findUserByEmail = (email) => {
    return User.findOne({ email: email })
    // or return User.findOne({ email: email })
}


//Route !: Create a User using: POST "/api/auth/createuser". No Login Required
router.post('/createuser', [
    body('name', "Enter a name for than 2 letter").isLength({ min: 3 }),
    body('email', "Enter a Valid Email ;").custom(value => {
        return User.findUserByEmail(value).then(bolen => {
            if (bolen) {
                return Promise.reject("Email Already in Use!")
            }
        })
    }),
    body('password', "The Password should contain more than 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    // If there are errors, return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Email Already in Use" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json(authToken)

        // res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


// Route 2: Authenticate a user using Post : "/api/auth/login" - Login Request
router.post('/login', [
    body('email', "Enter not Valid! ;").isEmail(),
    body('password', "Password Cannot be blank").exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

// Route 3: Get logged in User Details using :Post "/api/auth/getuser" Login Required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router
