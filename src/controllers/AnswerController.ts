import { Request, Response} from 'express';
import {getCustomRepository} from 'typeorm';
import {SurveysUsersRepository} from "../repositories/SurveysUsersRepository";
import {AppError} from "../errors/AppError";

class AnswerController {

    // http://localhost:3333/answers/1?u=ef7f804d-0e3c-4546-845f-ee88d09d6c7a
    /*
    Route params => parametros que compoem a rota  /:nome_do_parametro
    routes.get("/answers/:value")

    query params => Busca, paginacao, (nao obrigatorios)
    eles sempre vem depois do simbolo '?', tem a estrutura
    chave = valor
    */
    async execute(request: Request, response: Response){

        const {value} = request.params;  //recebemos parametros da rota
        const {u} = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),   
        });

        if (!surveyUser){  //verificamos que usuario existe na base de dados

            throw new AppError("Survey User does not exists");
            //o throw lanza o error para a clase superior, ou seja, a classe que o chamou

            /*return response.status(400).json({
                error: "Survey User does not exists"
            });*/
        }


        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);

    }


}

export { AnswerController}