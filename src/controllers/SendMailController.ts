import { Request, Response} from 'express';
import {resolve} from 'path';
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import SendMailService from "../services/SendMailService";
import {AppError} from "../errors/AppError";



class SendMailController{

    async execute(request: Request, response: Response){
        const {email, survey_id} = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const surveysRepository = getCustomRepository(SurveysRepository);

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const user = await usersRepository.findOne({ email });

        if (!user){
            throw new AppError("User does not exists.");
            /*return response.status(400).json({
                error: "User does not exists.",
            });*/
        }

        const survey = await surveysRepository.findOne({id: survey_id});

        if (!survey){
            throw new AppError("Survey does not exists.");
            /*return response.status(400).json({
                error: "Survey does not exists."
            });*/
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs" );





       /* const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: [{user_id: user.id}, {value: null}],  //isso aqui e um or
            relations: ["user", "survey"],
        });*/

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: {user_id: user.id, value: null},  //isso aqui e um and
            relations: ["user", "survey"],
        });

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL,
        };


        if (surveyUserAlreadyExists){
            variables.id = surveyUserAlreadyExists.id;
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }

        //salvamos informacoes na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id,
        });

        

        await surveysUsersRepository.save(surveyUser);

        variables.id = surveyUser.id;

        //enviamos email para o usuario
        await SendMailService.execute(email, survey.title, variables, npsPath);



        return response.json(surveyUser);
    }

}

export { SendMailController};