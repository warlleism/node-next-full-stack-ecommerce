import 'express-async-errors'
import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes/routes";
import { errorMiddleware } from './middlewares/error'
import cors from 'cors';
import { setupSwagger } from '../swagger';

AppDataSource.initialize().then(() => {
    const app = express()
    setupSwagger(app)
    
    const corsOptions = {
        origin: true, 
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    };

    app.use(cors(corsOptions));
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(express.json())
    app.use(routes)
    app.use(errorMiddleware)
   

    return app.listen(process.env.PORT)
})