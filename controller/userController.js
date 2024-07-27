const User = require('../models/users');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Amitisagoodb$oy'; // Consider using environment variables for secrets
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            role,
            password: hashedPassword,
        });

        if (user) {
            const data = {
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }
            };
            const authtoken = jwt.sign(data, JWT_SECRET);

            res.json({
                msg: "Registration successful",
                authtoken
            });
        }

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) return res.json({ msg: "Incorrect username", status: false });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.json({ msg: "Incorrect password", status: false });

        const data = {
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({
            msg: "Logged in successfully",
            authtoken
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
};

const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
