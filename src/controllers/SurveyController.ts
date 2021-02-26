import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository} from "../repositories/SurveysRepository"

class SurveyController{

    async create(request: Request, response: Response){
        const {title, description} = request.body;
        const surveysRepository = getCustomRepository(SurveysRepository);

        //criamos uma pesquisa, a la que pasamos o titulo e a descricao
        const survey = surveysRepository.create({
            title,
            description
        });
        //salvamos a informacao
        await surveysRepository.save(survey);

        return response.status(201).json(survey);
        //o status 201 significa por padrao que algo foi criado


    }
    //lista todas as pesquisas que a gente tem
    async show(request: Request, response: Response){
        const surveysRepository = getCustomRepository(SurveysRepository);
        const all = await surveysRepository.find(); //lista os registros que a gente tem
        return response.json(all); //tiene un comando asociado no arquivo routes.ts
    }

}

export { SurveyController }