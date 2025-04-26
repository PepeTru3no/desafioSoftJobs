import { config } from "dotenv";
import { getUsuarios, loginUser, registerUser } from "../models/usuario.models.js";
import jwt from 'jsonwebtoken';
config();
const secret = process.env.SECRET;

export const getUariosController = async (req, res) => {
    const data= req.data;
    try {
        const user = await getUsuarios(data);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const registerController = async (req, res) => {
    const data = req.data;
    try {
        await registerUser(data);
        res.json({ message: 'usuario creado correctamente' })
    } catch (error) {
        res.json(error)

    }
}

export const loginController = async (req, res) => {

    const data = req.data;
    try {
        const user = await loginUser(data);
        const email = data.email;
        const token = jwt.sign({ email }, secret);
        res.json({ token });
    } catch (error) {
        res.json({ error });
    }
}