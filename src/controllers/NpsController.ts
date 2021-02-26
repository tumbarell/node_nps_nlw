import { Request, Response} from 'express';
import {getCustomRepository, Not, IsNull} from 'typeorm';
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class NpsController {

    /*
    NPS
    Detratores dao nota de 0-6
    Passivos               7-8
    Promotores             9-10

    no calculo só importam os detratores e os promotores

    100*(Num_promot - Num_detratores)/(total_de_respondentes)

    */


    async execute(request: Request, response: Response){

        const {survey_id} = request.params;  //recebemos o id da pesquisa que o usuario quer

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await surveysUsersRepository.find({
            //procuramos todas as pesquisas referentes ao request
            //cujo valor nao seja nulo
            survey_id,
            value: Not(IsNull()),
        });

        const detractor = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length;

        const promotors = surveysUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10
        ).length;

        const passive = surveysUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length; 
        
        const totalAnswers = surveysUsers.length;

        //calculamos o nps
        const calculate = Number((100*(promotors-detractor)/totalAnswers).toFixed(2));

        return response.json({
            detractor,
            promotors,
            passive,
            totalAnswers,
            nps: calculate,

        })

    }

}

export { NpsController};