import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from 'yup';
import {AppError} from "../errors/AppError";

class UserController{
    async create(request: Request, response: Response){
        /*const body = request.body;  //el body lo definimos usando  insomnia
        /*console.log(body);
        return response.send();

        /*despues de recibir la informaciones,
        debemos guardarlas en el banco de datos*/
        const {name, email} = request.body;
        //const usersRepository = getRepository(User);

        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigátorio"),
            email: yup.string().email().required("Email incorreto"),
        });

        /*if (!(await schema.isValid(request.body))){
            return response.status(400).json({error: "Validation Failed!"});
        }*/

        //outra forma de fazer a validacao
        try{
            await schema.validate(request.body, {abortEarly: false});
        } catch(err) {
            throw new AppError(err);
            //return response.status(400).json({error: err});
        }

        const usersRepository = getCustomRepository(UsersRepository);

        //equivale a select * from users where email = "email"
        const userAlreadyExists = await usersRepository.findOne({
            email 
        });

        if (userAlreadyExists){

            throw new AppError("User already exists");
            /*return response.status(400).json({
                error: "User already exists",
            });*/
        }

        const user = usersRepository.create({
            name, email,
        });

        await usersRepository.save(user);

        //return response.send();
        return response.status(201).json(user);  //teste

    }
}

export { UserController };
