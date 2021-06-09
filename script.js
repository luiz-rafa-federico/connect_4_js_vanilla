// Variáveis globais
const mapa = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
// Variáveis globais

//funçao para gerar as peças de cada jogador
const gerarPecas = () => {
    const input1 = document.getElementById("jogador1").value;
    const input2 = document.getElementById("jogador2").value;

    const pecasJogador1 = document.getElementById("pecasJogador1");
    pecasJogador1.innerHTML = '';
    const nomeJogador1 = document.createElement("p");
    nomeJogador1.innerText = input1;
    pecasJogador1.appendChild(nomeJogador1);
    const pecasJogador2 = document.getElementById("pecasJogador2");
    pecasJogador2.innerHTML = '';
    const nomeJogador2 = document.createElement("p");
    nomeJogador2.innerText = input2;
    pecasJogador2.appendChild(nomeJogador2);

    for (let i = 1; i <= 2; i++) {
        for (let j = 0; j < 21; j++) {
            let peca = document.createElement("div");
            peca.classList.add(`pecaJogador${i}`, `peca${j}_${i}`, 'pecas');
            if (i === 1) {
                pecasJogador1.appendChild(peca);
            } else {
                pecasJogador2.appendChild(peca);
            }
        }
    }
};
//funçao para gerar as peças de cada jogador

// Construindo tabela
const gerarTabela = () => {
    for (let i = 0; i < mapa.length; i++) {
        const tabela = document.getElementById('tabela');
        let divLinha = i;
        divLinha = document.createElement('div');
        divLinha.style.display = 'flex';
        divLinha.classList.add('divLinha');
        tabela.appendChild(divLinha);

        for (let j = 0; j < mapa[i].length; j++) {
            let quadrado = mapa[i][j];
            quadrado = document.createElement('div');
            quadrado.classList.add('quadrado');
            divLinha.appendChild(quadrado);
        }
    }
};
// Construindo tabela

//handler para botao jogar
const btn_jogar = document.getElementById("btn_jogar");
btn_jogar.addEventListener("click", function () {
    const containerJogo = document.getElementById("jogo");
    containerJogo.classList.remove("displayNone");
    setTimeout(function () {
        gerarTabela();
        gerarPecas();
    }, 1000);
});
//handler para botao jogar


// Condição de vitória (sem array de possibilidades)
let vitoriaHorizontal = false;
let vitoriaVertical = false;
let vitoriaDiagonal = false;


const vitoriaHorizontal = () => {

    for (let j = 0; j < 7; j++) {               //itera nas 6 colunas de j = 0 a j = 6
        let contador = 1;
        let contagemAtual = mapa[0][j];         //para cada coluna j na linha i = 0 do mapa, o contador vale 1
        for (let i = 1; i < 7; i++) {           //  itera em 5 (a 6 é para não dar conflito) linhas. 
            if (contagemAtual === mapa[i][j]) { // Se na mesma linha i, com j diferente, os valores forem idênticos,
                contador++;                     // contador+1
                if (contador === 4) {           // se repetir 4x
                    vitoriaHorizontal = true;   //vitoriaHorizontal passa a ser true
                    break;                      // a verificação para
                }
            } else {
                contagemAtual = mapa[i][j];     // se não for igual, continua a contar como 1
                contador = 1;
            }
        }
    }
}


const vitoriaVertical = () => {

    for (let i = 0; i < 7; i++) {               //  itera em 5 (a 6 é para não dar conflito, já que i !== j) linhas. 
        let contador = 1;
        let contagemAtual = mapa[i][0];         //para cada linha i na coluna j = 0 do mapa, o contador vale 1
        for (let j = 1; j < 7; j++) {           //itera nas 6 colunas de j = 0 a j = 6
            if (contagemAtual === mapa[i][j]) { // Se na mesma coluna j, com i diferente, os valores forem idênticos,
                contador++;                     //contador+1
                if (contador === 4) {           // se repetir 4x
                    vitoriaVertical = true;     //vitoriaVertical passa a ser true
                    break;                      // a verificação para
                }
            } else {
                contagemAtual = mapa[i][j];     // se não for igual, continua a contar como 1
                contador = 1;
            }
        }
    }
}

const vitoriaDiagonal1 = () => {
    // Da esquerda para a direita
    for (let j = 0; j < 4; j++) {               //  itera nas colunas de j = 0 a j = 3
        for (let i = 0; i < 4; j++) {           //  itera nas linhas de i = 0 a i = 3
            let contador = 1;
            let contagemAtual = mapa[i][j];
                                                // a ideia é dar +1 para baixo e +1 para direita para formar a linha diagonal => \
            for (let k = 1; k < 3; k++) {       // criou -se uma iteração para somar 1 e 2. Para estender o alcance das combinações de i, j = 0 até i, j = 5, sobrando apenas a coluna j = 6.
                if (contagemAtual === mapa[i + k][j + k]) { //soma 1 e 2 a cada endereço de linha e coluna, formando diagonal. SE forem iguais,
                    contador++;                 //contador +1
                    if (contador === 4) {       // se repetir 4x
                        vitoriaDiagonal = true; // vitóriadiagonal1 passa a ser true
                        break;                  // a verificação para
                    }
                }
            }
        }
    }
}

const vitoriaDiagonal2 = () => {
    // Da direita para a esquerda
    for (let j = 4; j > 7; j++) {               //  itera nas colunas de j = 4 a j = 6
        for (let i = 0; i < 4; j++) {           //  itera nas linhas de i = 0 a i = 3
            let contador = 1;
            let contagemAtual = mapa[i][j];
                                                // a ideia é dar +1 para baixo e +1 para esquerda para formar a linha diagonal inversa => /
            for (let k = 1; k < 3; k++) {       // criou -se uma iteração para somar 1 e 2. Para estender o alcance das combinações de i=0 e j=6 até i=5 e j=2, sobrando apenas as coluna j = 0 e 1. POrém, como há 4 colunas de interseção com as 6 linhas, todas as combinações passam a ser possíveis com as duas funções diagonais.
                if (contagemAtual === mapa[i + k][j - k]) { //soma 1 e 2 para cada endereço de linha e subtrai 1 e 2 para cada endereço de coluna, formando diagonal. SE forem iguais,
                    contador++;                 //contador+1
                    if (contador === 4) {       // se repetir 4x
                        vitoriaDiagonal = true; // vitóriadiagonal2 passa a ser true
                        break;                  // a verificação para
                    }
                }
            }
        }
    }
}

const vitoriaDiagonal = () => {                 //vitória na diagonal é composta pelas duas funções
    vitoriaDiagonal1();
    vitoriaDiagonal2();
}

const empate = (mapa) => {                      //se na primeira linha[0] do mapa, todos os endereços de coluna forem diferentes de zero e ainda nnão tem vencedor, logo, empate
    return mapa[0].every((j) => j !== '0');
}

const declaraVitoria = () => {
    vitoriaHorizontal();
    vitoriaVertical();
    vitoriaDiagonal();
    empate(mapa);

    if (vitoriaHorizontal || vitoriaVertical || vitoriaDiagonal) {
        if (vitoriaHorizontal && !vitoriaVertical && !vitoriaDiagonal) {
            document.getElementById("msgRetorno").innerHTML = "Vitória por Linha";
        }
        if (!vitoriaHorizontal && vitoriaVertical && !vitoriaDiagonal) {
            document.getElementById("msgRetorno").innerHTML = "Vitória por Coluna";
        }
        if (!vitoriaHorizontal && !vitoriaVertical && vitoriaDiagonal) {
            document.getElementById("msgRetorno").innerHTML = "Vitória por Diagonal";
        }
        if (vitoriaHorizontal && vitoriaVertical && !vitoriaDiagonal) {
            document.getElementById("msgRetorno").innerHTML = "Vitória por Linha e Coluna";
        }
        if (vitoriaHorizontal && !vitoriaVertical && vitoriaDiagonal) {
            document.getElementById("msgRetorno").innerHTML = "Vitória por Linha e Diagonal";
        }
        if (!vitoriaHorizontal && vitoriaVertical && vitoriaDiagonal) {
            document.getElementById("msgRetorno").innerHTML = "Vitória por Coluna e Diagonal";
        }
        if (vitoriaHorizontal && vitoriaVertical && vitoriaDiagonal) {
            document.getElementById("msgRetorno").innerHTML = "Vitória por Linha, Coluna e Diagonal";
        } else {
            document.getElementById("msgRetorno").innerHTML = "Temos um empate!";
        }
    }
}




// Condição de vitória (sem array de possibilidades)