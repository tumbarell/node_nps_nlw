import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity("surveys")
class Survey{

    @PrimaryColumn()
    readonly id: string;

    @Column()  
    /*"entre comillas dentro del parentesis podemos colocar 
    el nombre de la columna caso no conicida con el nombre
    del atributo"*/
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if (!this.id){
            this.id = uuid();
        }
    }


}

export { Survey }