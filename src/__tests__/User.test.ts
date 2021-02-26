import request from 'supertest';
import { getConnection } from 'typeorm';
import {app} from '../app';

import createConnection from '../database'

describe("Users", () => {
    //antes de tudo rodamos as migrations
    beforeAll( async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll( async () => { //sempre que um teste for executado, eliminaremos a database criada

        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();

    });
   
   
    //rodamos testes
    it("Should be able to create a new user", async () =>{
        const response = await request(app).post("/users")
        .send({
            email: "user@example.com",
            name: "User Example",
        });

        expect(response.status).toBe(201);

    });

    it("Should not be able to create a user with an already existent email", async () =>{
        const response = await request(app).post("/users")
        .send({
            email: "user@example.com",
            name: "User Example",
        });

        expect(response.status).toBe(400); //associado a erro

    });
}
);