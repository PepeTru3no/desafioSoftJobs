import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import usuarioRouter from './routes/usuarios.routes.js'

config();

const app= express();

const port =process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(cors());
app.listen(port, console.log(`SERVER ON IN PORT ${port}`));
app.use('/', usuarioRouter);