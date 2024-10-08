const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/userModel');
const Joi = require('joi');

// This are for the Mock secret for JWT
const JWT_SECRET = 'mysecretkey';  

// This part are for the registration logic
const register = (req, res) => {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { username, email, password } = req.body;
    
    // It will check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) return res.status(400).send('User already exists.');

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword
    };

    users.push(newUser);
    res.status(201).send('User registered successfully!');
};

// This part will be for login logic
const login = (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.send({ token });
};

// This part is for the profile logic (protected route)
const getProfile = (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).send('User not found.');

    res.send({
        id: user.id,
        username: user.username,
        email: user.email
    });
};

// When the user input the necessary information it be validated here
const validateRegister = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports = { register, login, getProfile };  // Export the functions for use in routes/user.js
