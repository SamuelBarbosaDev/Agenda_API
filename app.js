import { resolve } from 'path';
import dotenv from 'dotenv';
dotenv.config()
import './src/database'
import express from 'express';
import homeRoutes from './src/routes/homeRoutes'
import userRoutes from './src/routes/userRoutes'
import tokenRoutes from './src/routes/tokenRoutes'
import alunoRouter from './src/routes/alunoRoutes'
import fotoRouter from './src/routes/fotoRouters'

class App{
    constructor(){
        this.app = express()
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.urlencoded({ extended: true}))
        this.app.use(express.json());
        this.app.use(express.static(resolve(__dirname, 'uploads')));
    }

    routes(){
        this.app.use('/', homeRoutes);
        this.app.use('/users/', userRoutes);
        this.app.use('/tokens/', tokenRoutes);
        this.app.use('/alunos/', alunoRouter);
        this.app.use('/fotos/', fotoRouter);
    }
}

export default new App().app;
