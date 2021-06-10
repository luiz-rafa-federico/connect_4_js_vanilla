// Variáveis globais
const mapa = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];
const msgRetorno = document.getElementById("msgRetorno");
// Variáveis globais

//handler para botao jogar
const btn_jogar = document.getElementById("btn_jogar")
btn_jogar.disabled = false;
btn_jogar.addEventListener("click", () => {
    document.querySelector(".regra1").style.display = 'none';
    document.querySelector(".regra2").style.display = 'none';
    document.querySelector(".regra3").style.display = 'none';
    const containerJogo = document.getElementById("jogo");
    containerJogo.classList.remove("displayNone");
    setTimeout(function() {
        gerarTabela();
        gerarPecas();
    }, 1000);
    btn_jogar.disabled = true;
});
//handler para botao jogar

// handler RESET JOGO
document.getElementById('btn_recomecar').addEventListener('click', () => {
    btn_jogar.disabled = false;
    let pecasJog1 = document.querySelector('#pecasJogador1');
    let pecasJog2 = document.querySelector('#pecasJogador2');
    pecasJog1.innerText = "";
    pecasJog2.innerText = "";

    document.querySelector('#tabela').innerHTML = "";
    for (let i = 0; i < mapa.length; i++) {
        for (let j = 0; j < mapa[i].length; j++) {
            mapa[i][j] = 0;
        }
    }
    document.getElementById("myForm").reset();
    document.querySelector('#msgRetorno').innerHTML = "";
    btn_jogar.innerText = 'Jogar Novamente!'
});
//handler RESET JOGO

// Construindo tabela
const gerarTabela = () => {
    for (let i = 0; i < mapa.length; i++) {
        const tabela = document.getElementById('tabela');
        let divLinha = document.createElement('div');
        divLinha.addEventListener("click", movePeca);
        divLinha.classList.add('divLinha');
        divLinha.id = `${i}`;
        tabela.appendChild(divLinha);
        for (let j = 0; j < mapa[i].length; j++) {
            let quadrado = document.createElement('div');
            quadrado.classList.add('quadrado');
            divLinha.appendChild(quadrado);
        }
    }
};
// Construindo tabela

//funçao para gerar as peças de cada jogador
let primeiro = 0;
const gerarPecas = () => {
    const input1 = document.getElementById("jogador1").value;
    const input2 = document.getElementById("jogador2").value;

    const pecasJogador1 = document.getElementById("pecasJogador1");
    pecasJogador1.innerHTML = '';
    const nomeJogador1 = document.createElement("p");
    nomeJogador1.innerText = input1;
    nomeJogador1.classList.add('jogNome1');
    pecasJogador1.appendChild(nomeJogador1);
    const pecasJogador2 = document.getElementById("pecasJogador2");
    pecasJogador2.innerHTML = '';
    const nomeJogador2 = document.createElement("p");
    nomeJogador2.classList.add('jogNome2');
    nomeJogador2.innerText = input2;
    pecasJogador2.appendChild(nomeJogador2);

    for (let i = 1; i <= 2; i++) {
        for (let j = 0; j < 21; j++) {
            let peca = document.createElement("div");
            peca.classList.add(`pecaJogador${i}`, 'pecas');
            if (i === 1) {
                pecasJogador1.appendChild(peca);
            } else {
                pecasJogador2.appendChild(peca);
            }
        }
    }
    primeiro = Math.floor(Math.random() * 2 + 1);
    if (primeiro === 1) {
        msgRetorno.innerHTML = `${input1} começa jogando!`;
    } else {
        msgRetorno.innerHTML = `${input2} começa jogando!`;
    }
};
//funçao para gerar as peças de cada jogador

// função pra mover peças
const movePeca = (event) => {
    let colunaClicada = event.currentTarget;
    let filhos = colunaClicada.children;
    for (let i = 0; i < filhos.length; i++) {
        if (filhos[i].childElementCount === 0) {
            let celula = filhos[i];
            let peca = pecasJogador1.lastElementChild;
            let indiceColuna = colunaClicada.id;
            let indiceLinha = i;
            let numero = 0;
            if (primeiro % 2 === 0) {
                peca = pecasJogador2.lastElementChild;
                celula.appendChild(peca);
                numero = 2;
                i = filhos.length;
            } else {
                celula.appendChild(peca);
                numero = 1;
                i = filhos.length;
            }
            mapa[indiceColuna][indiceLinha] = numero;
            primeiro++;
            verificaVitoria(Number(indiceColuna), Number(indiceLinha));
        }
    }
};
//função pra mover peças

// função que verifica vitoria
const verificaVitoria = (iCol, iLin) => {
    verificaHorizontal(iCol, iLin);
    verificaVertical(iCol, iLin);
    verificaDiagonalEsqDir(iCol, iLin);
    verificaDiagonalDirEsq(iCol, iLin);
    // verificaEmpate(mapa);
};
// função que verifica vitoria

// função que verifica horizontal
const verificaHorizontal = (iCol, iLin) => {
    let jogador = mapa[iCol][iLin];
    let contador = 0;
    for (let i = 0; i < mapa.length; i++) {
        if (mapa[i][iLin] === jogador) {
            contador++;
            if (contador === 4) {
                console.log("vencedor horizontal")
            }
        } else {
            contador = 0;
        }
    }
};
// função que verifica horizontal

// função que verifica vertical
const verificaVertical = (iCol, iLin) => {
    let jogador = mapa[iCol][iLin];
    let contador = 0;
    for (let i = 0; i < mapa[0].length; i++) {
        if (mapa[iCol][i] === jogador) {
            contador++;
            if (contador === 4) {
                console.log("vencedor vertical")
            }
        } else {
            contador = 0;
        }
    }
};
// função que verifica vertical

// função que verifica diagonal esq-->dir
const verificaDiagonalEsqDir = (iCol, iLin) => {
    let jogador = mapa[iCol][iLin];
    let iColInicial = iCol - iLin;
    if (iColInicial < 0) {
        iColInicial = 0;
    };
    let iLinInicial = iLin - iCol;
    if (iLinInicial < 0) {
        iLinInicial = 0;
    };
    let contador = 0;
    let condicao = true;
    while (condicao) {
        if (jogador === mapa[iColInicial][iLinInicial]) {
            contador++;
            if (contador === 4) {
                console.log("vencedor diagonal esq-->dir")
            }
        } else {
            contador = 0;
        }
        iColInicial++;
        iLinInicial++;
        if (iColInicial > 6 || iLinInicial > 5) {
            condicao = false;
        }
    }
};
// função que verifica diagonal esq-->dir

// função que verifica diagonal dir->esq
const verificaDiagonalDirEsq = (iCol, iLin) => {
    let jogador = mapa[iCol][iLin];
    let iColInicial = iCol + iLin;
    if (iColInicial > 6) {
        iColInicial = 6;
    }
    let iLinInicial = (iLin + iCol) - iColInicial;
    let contador = 0;
    let condicao = true;
    while (condicao) {
        if (jogador === mapa[iColInicial][iLinInicial]) {
            contador++;
            if (contador === 4) {
                console.log("vencedor diagonal dir->esq");
            }
        } else {
            contador = 0;
        }
        iColInicial--;
        iLinInicial++;
        if (iColInicial < 0 || iLinInicial > 5) {
            condicao = false;
        }
    }
};
// função que verifica diagonal dir->esq

// função que verifica empate
// const verificaEmpate = (mapa) => { //se na primeira linha[0] do mapa, todos os endereços de coluna forem diferentes de zero e ainda nnão tem vencedor, logo, empate
//     if (mapa[0].every((i) => i !== '0')) {
//         checaEmpate = true;
//     }
// };
// função que verifica empate

// const declaraVitoria = () => {
// }
// if (primeiro % 2 === 0) {
// } else if (primeiro % 2 !== 0) {
// };


// if (vitoriaHorizontal || vitoriaVertical || vitoriaDiagonal) {
//     if (vitoriaHorizontal && !vitoriaVertical && !vitoriaDiagonal) {
//         document.getElementById("msgRetorno").innerHTML = "Vitória por Linha";
//     }
//     if (!vitoriaHorizontal && vitoriaVertical && !vitoriaDiagonal) {
//         document.getElementById("msgRetorno").innerHTML = "Vitória por Coluna";
//     }
//     if (!vitoriaHorizontal && !vitoriaVertical && vitoriaDiagonal) {
//         document.getElementById("msgRetorno").innerHTML = "Vitória por Diagonal";
//     }
//     if (vitoriaHorizontal && vitoriaVertical && !vitoriaDiagonal) {
//         document.getElementById("msgRetorno").innerHTML = "Vitória por Linha e Coluna";
//     }
//     if (vitoriaHorizontal && !vitoriaVertical && vitoriaDiagonal) {
//         document.getElementById("msgRetorno").innerHTML = "Vitória por Linha e Diagonal";
//     }
//     if (!vitoriaHorizontal && vitoriaVertical && vitoriaDiagonal) {
//         document.getElementById("msgRetorno").innerHTML = "Vitória por Coluna e Diagonal";
//     }
//     if (vitoriaHorizontal && vitoriaVertical && vitoriaDiagonal) {
//         document.getElementById("msgRetorno").innerHTML = "Vitória por Linha, Coluna e Diagonal";
//     } else {
//         document.getElementById("msgRetorno").innerHTML = "Temos um empate!";
//     }
// };
