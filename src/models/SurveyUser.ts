import { Column, CreateDateColumn, Entity, JoinColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Survey } from "./Survey";
import { User } from "./User";

@Entity("surveys_users")
class SurveyUser{

    @PrimaryColumn()
    readonly id: string;

    @Column()  
    /*"entre comillas dentro del parentesis podemos colocar 
    el nombre de la columna caso no conicida con el nombre
    del atributo"*/
    user_id: string;



    @ManyToOne(() => User)
    @JoinColumn({name: "user_id"})
    user: User


    @Column()
    survey_id: string;

    @ManyToOne(() => Survey)
    @JoinColumn({name: "survey_id"})
    survey: Survey;


    @Column()
    value: number;    

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if (!this.id){
            this.id = uuid();
        }
    }


}

export { SurveyUser };

