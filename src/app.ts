import 'reflect-metadata';  //siempre debe ir primero
import express, {NextFunction, Request, Response} from 'express';
import "express-async-errors";
import createConnection from "./database"
import { router } from './routes';
import {AppError} from "./errors/AppError";

createConnection(); //chama a funcao criada no arquivo index.ts
const app = express();

app.use(express.json()); //le informamos al servidor que recibirá requests con ese formato

app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message,
        });
    }

    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`,
    });
});

export { app };
