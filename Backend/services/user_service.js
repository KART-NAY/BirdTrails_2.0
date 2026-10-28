const User = require("../models/user_model");
const bcrypt = require("bcryptjs");

const loginUser = async (email, password) => {
    const user = await User.findByEmail(email);
    if (!user) {
        throw new Error("Correo o contraseña incorrectos");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Correo o contraseña incorrectos");
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
};

const registerUser = async (name, email, password) => {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        throw new Error("El correo ya está registrado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create(name, email, hashedPassword);
};

module.exports = {
    loginUser,
    registerUser
};