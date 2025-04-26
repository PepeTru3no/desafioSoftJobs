import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from "dotenv";

config();
const secret = process.env.SECRET;

const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const registerMiddleware = async (req, res, next) => {
    const { email, password, rol, lenguage } = req.body;
    let passCrypt;
    const url = req.url;
    console.log(`Fecha de la consulta: ${new Date()}; URL consultada: ${url}; Datosrecibidas: `, req.body);
    try {

        if (!email.trim() || !password.trim() ||
            !rol.trim() || !lenguage.trim()) {
            return res.status(400).json({ message: 'Todods los campos son obligatorios' });
        }
        if (!emailFormat.test(email)) {
            return res.status(400).json({ message: 'El formato del email no es correcto!' })
        }
        passCrypt = bcrypt.hashSync(password);
    } catch (error) {
        return res.status(500).json(error)
    }
    req.data = {
        email,
        password: passCrypt,
        rol,
        lenguage
    }
    next();
}

export const loginMiddleware = async (req, res, next) => {
    const { email, password } = req.body;
    let passCrypt;
    const url = req.url;
    console.log(`Fecha de la consulta: ${new Date()}; URL consultada: ${url}; Datosrecibidas: `, req.body);
    try {

        if (!email.trim() || !password.trim()) {
            return res.status(400).json({ message: 'Todods los campos son obligatorios' });
        }
        if (!emailFormat.test(email)) {
            return res.status(400).json({ message: 'El formato del email no es correcto!' })
        }
        passCrypt = bcrypt.hashSync(password);
    } catch (error) {
        return res.status(500).json(error)
    }
    req.data = {
        email,
        password: passCrypt
    }
    next();
}

export const getUserMiddleware = async (req, res, next) => {
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    const url = req.url;
    console.log(`Fecha de la consulta: ${new Date()}; URL consultada: ${url};`);
    try {
        if(jwt.verify(token, secret)){
            const { email } = jwt.decode(token);
            req.data={
                email
            }    
        }       
           
    } catch (error) {
        return res.json({error});
    }
    next();
}