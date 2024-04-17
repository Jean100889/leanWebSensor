//npm install express
// Importa o módulo 'express' para lidar com rotas e servir aplicativos HTTP
const express = require('express')

// Importa o módulo 'body-parser' para analisar os corpos das requisições HTTP
var bodyParser = require('body-parser')

// Cria uma instância do aplicativo express
const app = express()

// npm i cors
// Importa o módulo 'cors' para permitir solicitações de origens cruzadas (CORS)
var cors = require("cors");

// Aplica o middleware 'cors' para permitir solicitações de origens cruzadas
app.use(cors());

// Configura o parser para JSON
var jsonParser = bodyParser.json()

// Inicializa os objetos que armazenarão o estado das chaves e da produção
chaves = {  
    'liga': 0,
    'desliga': 0,
    'restart': 0
}

producao = {sensor : 0}

//***********************controle das chaves**********************
// Define uma rota para lidar com solicitações POST para atualização das chaves
app.post('/chaves', jsonParser, function (req, res) {       
    // Define o cabeçalho da resposta
    res.writeHead(200, { 'Content-Type': 'application/json', mode: "cors"});
    // Atualiza o estado das chaves com os dados do corpo da requisição
    chaves = req.body;
    // Exibe as chaves atualizadas no console
    console.log(chaves);
    // Finaliza a resposta
    res.end();
})

// Define uma rota para lidar com solicitações GET para obter o estado das chaves
app.get('/chaves', function (req, res){
    // Define o cabeçalho da resposta
    res.writeHead(200, { 'Content-Type': 'application/json', mode: "cors"});
    // Envia o estado das chaves como resposta
    res.write(JSON.stringify(chaves));  
    // Finaliza a resposta
    res.end(); 
})
//*************************************************************** 

//***********************controle do sensor**********************
// Define uma rota para lidar com solicitações POST para atualização da produção
app.post('/producao', jsonParser, function (req, res) {       
    // Define o cabeçalho da resposta
    res.writeHead(200, { 'Content-Type': 'application/json', mode: "cors"});
    // Atualiza os dados de produção com os dados do corpo da requisição
    producao = req.body;
    // Exibe os dados de produção atualizados no console
    console.log(producao);
    // Finaliza a resposta
    res.end();
})

// Define uma rota para lidar com solicitações GET para obter os dados de produção
app.get('/producao', function (req, res){
    // Define o cabeçalho da resposta
    res.writeHead(200, { 'Content-Type': 'application/json', mode: "cors"});
    // Envia os dados de produção como resposta
    res.write(JSON.stringify(producao));  
    // Finaliza a resposta
    res.end(); 
})
//*************************************************************** 

// Inicia o servidor na porta 3000
app.listen(3000)
