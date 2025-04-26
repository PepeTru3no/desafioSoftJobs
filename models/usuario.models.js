import pool from "../db/db.js";
import bcrypt from "bcryptjs";

export const getUsuarios = async (data) => {

    const {email}= data;
    const query = 'select * from usuarios where email = $1';
    const values= [email];
    try {
        const { rows } = await pool.query(query, values);
        return rows;
    } catch (error) {
        console.log(error)
        return error;
    }
}

export const registerUser = async (data) => {
    const { email, password, rol, lenguage } = data;
    const query = "insert into usuarios (email, password, rol, lenguage ) values ($1, $2, $3, $4)";

    try {
        const values = [email, password, rol, lenguage];
        const { countRow } = await pool.query(query, values);
        return countRow;
    } catch (error) {
        return error;
    }
}

export const loginUser = async (data) => {
    const { email, password } = data;
    const query = 'select * from usuarios where email=$1 and password=$2';
    const values = [email, password];
    try {
        const user = await pool.query(query, values);
        return user;

    } catch (error) {
        console.log(error)
        return error;
    }
}   