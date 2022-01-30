// Iniciando
let jogadorAtual = 0;
let respostaCorreta = 0;
exibirQuestoes();

//Eventos
document.querySelector('button').addEventListener('click', reiniciar);

// Funções
function exibirQuestoes() {
    if(jogadores[jogadorAtual]) {
        let ja = jogadores[jogadorAtual];

        let porcentagem = Math.floor((jogadorAtual/jogadores.length) * 100);
        document.querySelector('.progress-bar').style.width = `${porcentagem}%`;

        document.querySelector('.pontuacao').style.display = 'none';
        document.querySelector('main').style.display = 'grid';

        document.querySelector('.pic').innerHTML = '<img src="'+ja.foto+'">';
        optionsHTML = '';
        for(let i in ja.opcoes) {
            optionsHTML += `<li data-op="${i}"> <span>${parseInt(i)+1}</span> ${ja.opcoes[i]} </li>`;
        }
        document.querySelector('.options ul').innerHTML = optionsHTML;

        document.querySelectorAll('.options ul').forEach(item => {
            item.addEventListener('click', clickOpcao);
        });
    } else {
        fimDoQuiz();
    }
}

function clickOpcao(e) {
    let aoClicar = parseInt(e.target.getAttribute('data-op'));

    if(jogadores[jogadorAtual].resposta === aoClicar) {
        respostaCorreta++
    }
    jogadorAtual++
    exibirQuestoes();
}

function fimDoQuiz() {
    document.querySelector('main').style.display= 'none';
    document.querySelector('.pontuacao').style.display= 'flex';

    document.querySelector('.progress-bar').style.width = '100%';

    let acertos = Math.floor((respostaCorreta / jogadores.length) * 100);

    document.querySelector('.pctg').innerHTML = `Você acertou ${acertos}%`;
    document.querySelector('.fraseFinal').innerHTML = `Total de acertos: ${respostaCorreta} de ${jogadores.length}.`;

    if(acertos < 30) {
        document.querySelector('.imagem').innerHTML = '<img src="assets/negativo.png">';
        document.querySelector('.nivel').innerHTML = 'Tá mal ein parça!';
        document.querySelector('.pctg').style.color = 'red';
    } else if(acertos >= 30 && acertos < 70) {
        document.querySelector('.imagem').innerHTML = '<img src="assets/positivo.png">';
        document.querySelector('.nivel').innerHTML = 'Você mandou bem!';
        document.querySelector('.pctg').style.color = '#ffd700';
    } else {
        document.querySelector('.imagem').innerHTML = '<img src="assets/trofeu.png">';
        document.querySelector('.nivel').innerHTML = 'Você é um monstro sagrado!';
        document.querySelector('.pctg').style.color = 'green';
    }
}

function reiniciar() {
    jogadorAtual = 0;
    respostaCorreta = 0;
    exibirQuestoes();
}