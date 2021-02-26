import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity("users")   //nuestra classe será uma entidade, entre comillas el nombre de la tabla
class User{
    
    @PrimaryColumn()
    readonly id: string;

    @Column()  
    /*"entre comillas dentro del parentesis podemos colocar 
    el nombre de la columna caso no conicida con el nombre
    del atributo"*/
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if (!this.id){
            this.id = uuid();
        }
    }

}

export { User }