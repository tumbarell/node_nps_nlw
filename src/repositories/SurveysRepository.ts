import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

//la clase hereda de Repository, y estará asociada a la entidad <User>
@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey>{}

export { SurveysRepository };
