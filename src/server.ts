

/*import 'reflect-metadata';  //siempre debe ir primero
import express from 'express';
import "./database"
import { router } from './routes';

const app = express();
/*
metodos frecuentemente utilizados no http
GET  busca
POST  salvar
PUT  alterar
DELETE
PATCH alteracion especifica
*/
//
//criar o servidor
//                 port rota
// http://localhot:3333/users
/*app.get("/users", (request,response) =>{
    return response.send("Hello World NLW4");
});*/

import { app } from "./app";

//variante que da el mismo resultado
/*app.get("/users", (request,response) =>{
    return response.json({message: "Hello World - NLW04"});
});*/

/*
1er parametro: rota (recurso API)
2do parametro: request,response 
por padra o browser trabalha com GET
para poder utilizar otros métodos en el
browser, necesitamos utilizar ferramentas
como Insomnia*/
/*app.get("/", (request,response) =>{
    return response.json({message: "Hello World - NLW04"});
});
app.post("/", (request,response) => {
    //recebeu os dados para salvar, entao vamos retornar
    return response.json({message: "Os dados foram salvos com sucesso"})
})

app.listen(3333, () => console.log("Server is running"));
// 'Server is running' se muestra en la consola

/* se executarmos
http://localhost:3333/users
en el navegador, veriamos el mensaje
'Hello World NLW4'*/

/*do jeito que está o server fica poluido,
resulta mais eficiente colocar todos esses comandos em um
controller, que será chamado pelo servidor quando necessário*/

/*app.use(express.json()); //le informamos al servidor que recibirá requests con ese formato

app.use(router);*/

app.listen(3333, () => console.log("Server is running"));