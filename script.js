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
btn_jogar.addEventListener("click", function() {
    const containerJogo = document.getElementById("jogo");
    containerJogo.classList.remove("displayNone");
    setTimeout(function() {
        gerarTabela();
        gerarPecas();
    }, 1000);
});
//handler para botao jogar