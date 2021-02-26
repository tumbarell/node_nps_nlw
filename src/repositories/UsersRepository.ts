import { Repository, EntityRepository } from "typeorm";
import { User } from "../models/User";

//la clase hereda de Repository, y estará asociada a la entidad <User>
@EntityRepository(User)
class UsersRepository extends Repository<User>{}

export { UsersRepository };