// Seleciona o botão de ligar na interface e atribui a variável ligarButton
const ligarButton = document.getElementById('ligarButton');

// Seleciona o botão de desligar na interface e atribui à variável desligarButton
const desligarButton = document.getElementById('desligarButton');

// Seleciona o botão de reiniciar na interface e atribui à variável restartButton
const restartButton = document.getElementById('restartButton');

// Seleciona o display de produção na interface e atribui à variável producaoDisplay
const producaoDisplay = document.getElementById('producaoDisplay');

// Seleciona o display de feedback na interface e atribui à variável feedBackDisplay
const feedBackDisplay = document.getElementById('msgDisplay');

// Define a URL para enviar requisições POST para o servidor
var urlPost = 'https://leanwebsensor-7t8c.onrender.com/chaves'

// Define a URL para enviar requisições GET para o servidor
var urlGet = 'https://leanwebsensor-7t8c.onrender.com/producao'

// Define uma função para fazer requisições GET para o servidor em intervalos regulares
function receiverRequest(){
    // Faz uma requisição GET para a URL especificada
    fetch(urlGet, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        }
    })
    // Processa a resposta como JSON
    .then(response => response.json())
    // Atualiza os displays na interface com os dados recebidos
    .then(json => {
        producaoDisplay.textContent = json.sensor; // Atualiza o display de produção
        feedBackDisplay.textContent = json.msg; // Atualiza o display de feedback
        console.log(json.sensor); // Exibe os dados do sensor no console
        console.log(json.msg); // Exibe a mensagem no console
    })
}

// Define um intervalo para chamar a função receiverRequest a cada 2 segundos
setInterval(receiverRequest, 2000);

// Adiciona um ouvinte de evento ao botão de ligar
ligarButton.addEventListener('click', () => {
    // Define os dados a serem enviados quando o botão de ligar é clicado
    let requestData = {"liga": 1, "desliga": 0, "restart": 0}
    // Chama a função para enviar a requisição POST com os dados especificados
    sendRequest(requestData)
});

// Adiciona um ouvinte de evento ao botão de desligar
desligarButton.addEventListener('click', () => {
    // Define os dados a serem enviados quando o botão de desligar é clicado
    let requestData = {"liga": 0, "desliga": 1, "restart": 0}
    // Chama a função para enviar a requisição POST com os dados especificados
    sendRequest(requestData)
});

// Adiciona um ouvinte de evento ao botão de reiniciar
restartButton.addEventListener('click', () => {
    // Define os dados a serem enviados quando o botão de reiniciar é clicado
    let requestData = {"liga": 0, "desliga": 0, "restart": 1}
    // Chama a função para enviar a requisição POST com os dados especificados
    sendRequest(requestData)
});

// Define uma função para enviar requisições POST para o servidor
function sendRequest(data){
    // Envia uma requisição POST para a URL especificada
    fetch(urlPost, {
        method: 'POST', // Especifica o método como POST
        headers: {
            'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify(data) // Converte os dados para JSON e os envia como corpo da requisição
    })
}
