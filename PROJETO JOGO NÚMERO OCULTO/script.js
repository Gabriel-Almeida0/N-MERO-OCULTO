// script.js

// Seleção de elementos do DOM
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const message = document.getElementById('message');
const attemptsSpan = document.getElementById('attempts');
const restartBtn = document.getElementById('restartBtn');
const minSpan = document.getElementById('min');
const maxSpan = document.getElementById('max');

// Definição do intervalo do número oculto
const min = 1;
const max = 100;

// Inicialização do número oculto e tentativas
let numeroOculto;
let tentativas;

// Função para gerar número aleatório
function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para iniciar o jogo
function iniciarJogo() {
    numeroOculto = gerarNumeroAleatorio(min, max);
    tentativas = 0;
    tentativasSpan.textContent = tentativas;
    message.textContent = 'Faça seu palpite!';
    restartBtn.classList.add('hidden');
    guessBtn.disabled = false;
    guessInput.disabled = false;
    guessInput.value = '';
    guessInput.focus();
    console.log(`Número Oculto (para debug): ${numeroOculto}`); // Remova ou comente essa linha em produção
}

// Função para exibir mensagens
function exibirMensagem(msg, cor) {
    message.textContent = msg;
    message.style.color = cor;
}

// Função para validar o palpite
function validarPalpite(palpite) {
    if (palpite === '' || isNaN(palpite)) {
        exibirMensagem('Por favor, insira um número válido.', 'red');
        return false;
    }
    if (palpite < min || palpite > max) {
        exibirMensagem(`O número deve estar entre ${min} e ${max}.`, 'red');
        return false;
    }
    return true;
}

// Função para processar o palpite
function processarPalpite() {
    const palpite = parseInt(guessInput.value);

    if (!validarPalpite(palpite)) {
        return;
    }

    tentativas += 1;
    tentativasSpan.textContent = tentativas;

    if (palpite === numeroOculto) {
        exibirMensagem(`Parabéns! Você acertou o número ${numeroOculto} em ${tentativas} tentativas.`, 'green');
        finalizarJogo();
    } else if (palpite < numeroOculto) {
        exibirMensagem('Muito baixo! Tente novamente.', 'blue');
    } else {
        exibirMensagem('Muito alto! Tente novamente.', 'blue');
    }

    guessInput.value = '';
    guessInput.focus();
}

// Função para finalizar o jogo
function finalizarJogo() {
    guessBtn.disabled = true;
    guessInput.disabled = true;
    restartBtn.classList.remove('hidden');
}

// Event Listener para o botão de adivinhação
guessBtn.addEventListener('click', processarPalpite);

// Event Listener para o botão de reiniciar
restartBtn.addEventListener('click', iniciarJogo);

// Event Listener para pressionar "Enter" no input
guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        processarPalpite();
    }
});

// Iniciar o jogo quando a página carregar
window.onload = iniciarJogo;
