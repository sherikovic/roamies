const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        // if (await User.findOne({ $or: [{ username: username }, { email: email }] })) {
        //     return res.status(401).json("User exists!");
        // }
        if (await User.findOne({ username: username })) {
            return res.
                status(401).
                json({ message: 'username exists' })
        }
        if (await User.findOne({ email: email })) {
            return res.
                status(401).
                json({ message: 'email exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            fullname: '',
            country: '',
            city: '',
            github: '',
            linkedin: ''
        });
        await newUser.save();
        req.logIn(newUser, err => {
            if (err) {
                return res.
                    status(500).
                    json(
                        { message: "User was created but an error occured while trying to log in." }
                    )
            }
            res.
                status(201).
                json(
                    { message: "User was created" }
                );
        });
    } catch {
        res.
            status(500).
            json(
                { message: "Something went wrong, couldn't create user!" }
            );
    }
};

module.exports.login = (req, res) => {
    res.
        status(201).
        json(
            { message: 'Log in succussful', user: req.user }
        );
};

module.exports.logout = async (req, res) => {
    // no need to delete the cookie on the client side since req.logout will remove
    // req.user from passport and thus authentication becomes null
    // on the client side, the cookie is not destroyed but it is invalidated
    // cookie will remain the same while logged in and will change once you log out
    req.logOut(function (err) {
        if (err) {
            return next(err);
        };
        res.json({ message: "logged out" });
    });
};

module.exports.getLoggedInUser = async (req, res) => {
    if (req.user) {
        res.
            status(201).
            json(
                { user: req.user.username }
            );
    } else {
        res.json({ user: null })
    }
}
