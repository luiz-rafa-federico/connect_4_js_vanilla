// escolher quem vai jogar
let segundo = 1;
let primeiro = Math.floor(Math.random() * 2 + 1);
if (primeiro === 1) {
    segundo = 2;
}
// escolher quem vai jogar

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


//handler para botao jogar
const btn_jogar = document.getElementById("btn_jogar");
btn_jogar.addEventListener("click", function() {
    const containerJogo = document.getElementById("jogo");
    containerJogo.classList.remove("displayNone");
    gerarPecas();
});
//handler para botao jogar