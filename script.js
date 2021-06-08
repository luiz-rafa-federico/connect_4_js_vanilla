//funçao para gerar as peças de cada jogador
const gerarPecas = () => {
        const input1 = document.getElementById("jogador1").value;
        const input2 = document.getElementById("jogador2").value;

        const pecasJogador1 = document.getElementById("pecasJogador1");
        const pecasJogador2 = document.getElementById("pecasJogador2");

        let segundo = 1;
        let primeiro = Math.floor(Math.random() * 2 + 1);
        if (primeiro === 1) {
            segundo = 2;
        }
        console.log(primeiro, segundo)

        for (let i = 1; i <= 2; i++) {
            for (let j = 0; j < 21; j++) {
                let peca = document.createElement("div")
                peca.classList.add = (`pecaJogador${i}`, `peca${j}.${i}`, 'pecas')
                if (i === 1) {
                    pecasJogador1.appendChild(peca)
                } else {
                    pecasJogador2.appendChild(peca)
                }
            }
        }
    }
    //funçao para gerar as peças de cada jogador


//handler para botao jogar
const btn_jogar = document.getElementById("btn_jogar")
btn_jogar.addEventListener("click", function() {
    gerarPecas();

    const containerJogo = document.getElementById("jogo")
    containerJogo.classList.toggle = "displayNone"
});
//handler para botao jogar